import { NextApiRequest, NextApiResponse } from "next";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

const secret = process.env.SANITY_WEBHOOK_SECRET ?? "";

/**
 * This is based off of the projection set up in the webhook
  {
    _id,
    _type,
    slug
  } 
 */
interface WebhookPayload {
  _id: string;
  slug: {
    current: string;
    _type: string;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Auth example pulled from https://github.com/sanity-io/webhook-toolkit
  const signatureHeader = req.headers[SIGNATURE_HEADER_NAME] ?? "";
  const signature = Array.isArray(signatureHeader) ? signatureHeader[0] : signatureHeader;
  const body = await readBody(req); // Read the body into a string
  console.log("received a potential webhook request");

  if (!isValidSignature(body, signature, secret)) {
    console.log("unauthorized webhook attempt thwarted");
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }
  console.log("authorization step has passed");

  req.body = JSON.parse(body) as WebhookPayload; // since body parse is turned off, we have to manually replace req.body
  console.log("parsed body: ");
  console.log(req.body);

  // send purge request to Fastly
  // get fastly token to use in purge request
  // set environment variables in CI rather than manually

  res.status(200).json({
    message: "Webhook received",
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
