import { NextApiRequest, NextApiResponse } from "next";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

const secret = process.env.SANITY_WEBHOOK_SECRET ?? "";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Auth example pulled from https://github.com/sanity-io/webhook-toolkit
  const signatureHeader = req.headers[SIGNATURE_HEADER_NAME] ?? "";
  const signature = Array.isArray(signatureHeader) ? signatureHeader[0] : signatureHeader;
  const body = await readBody(req); // Read the body into a string
  console.log("parsed body: ");
  console.log(body);
  if (!isValidSignature(body, signature, secret)) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  console.log("validation has passed!");

  console.log("received a potential webhook request with the following payload: ");

  // validate request
  // send purge request to Fastly
  // get fastly token to use in purge request

  console.log(req.body);
  res.status(200).json({
    message: "hello, webhook!",
    body: req.body,
    query: req.query,
    cookies: req.cookies,
  });
}

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false,
  },
};

async function readBody(readable: NextApiRequest) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}
