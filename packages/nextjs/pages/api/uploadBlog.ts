import sanityClient from "@sanity/client";
import Cors from "cors";
import formidable from "formidable";
import mammoth from "mammoth";
import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "node-html-parser";
import { v4 } from "uuid";

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

const cors = Cors({
  methods: ["POST"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: Function) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

function convertToHtml(path: string) {
  const options = {
    styleMap: ["p[style-name='Heading'] => h1", "p[style-name='Body'] => p"],
  };

  return mammoth.convertToHtml({ path }, options).then((result) => {
    const html = parse(result.value);

    // Remove Empty anchor tags
    const anchors = html.querySelectorAll("a");
    anchors.forEach((a) => a.remove());

    return html.toString();
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    const form = formidable({ maxFiles: 1 });

    return form.parse(req, async (err, _, files) => {
      if (err) {
        res.status(err.httpCode || 400);
        res.setHeader("Content-Type", "text/plain");
        res.send(String(err));
        return;
      }

      const filePath: string = (files?.["file"] as formidable.File[])?.[0].filepath;
      if (!filePath) {
        return res.status(400).json({ error: "File not found, use the 'file' key for the body" });
      }

      const resp = await convertToHtml(filePath);

      const doc = {
        _id: `drafts.${v4()}`,
        _type: "blog",
        title: "Test Title",
        content: resp,
      };

      try {
        await client.createIfNotExists(doc);

        return res.status(200).json({ success: true });
      } catch (error) {
        return res.status(500).json({ error: "Error creating document in Sanity" });
      }
    });
  } else {
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};