import { NextApiRequest, NextApiResponse } from "next";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

const fastlyApiKey = process.env.FASTLY_API_KEY ?? "";
const fastlyServiceId = process.env.FASTLY_SERVICE_ID ?? "";
const secret = process.env.SANITY_WEBHOOK_SECRET ?? "";

/**
 * This is based off of the projection set up in the webhook
 * 
    *[_type in ["category", "product"]]
    {
        _id,
        _type,
        'slug': slug.current
    }
 *   
 */
interface WebhookPayload {
  _id: string;
  _type: string;
  slug: string;
}

/**
 * Api handler to receive webhook POST Requests from Sanity when content changes
 * @param req Next Request Object
 * @param res Next Response Object
 * @returns void
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // only allow post requests
    if (req.method !== "POST") {
      res.status(405).json({ message: "Only POST is supported" });
      return;
    }

    // Auth example pulled from https://github.com/sanity-io/webhook-toolkit
    const signatureHeader = req.headers[SIGNATURE_HEADER_NAME] ?? "";
    const signature = Array.isArray(signatureHeader) ? signatureHeader[0] : signatureHeader;
    const body = await readBody(req); // Read the body into a string

    if (!body) {
      res.status(400).json({ message: "Bad Input" });
      return;
    }

    console.log("received a potential webhook request");

    if (!isValidSignature(body, signature, secret)) {
      console.log("unauthorized webhook attempt thwarted");
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    console.log("authorization step has passed");

    // req.body is empty because bodyParser has been disabled below
    const parsedBody = JSON.parse(body) as WebhookPayload;
    console.log("parsed body: ");
    console.log(parsedBody);

    const { slug, _type } = parsedBody;

    let keysToPurge = [_type];

    if (slug) keysToPurge.push(`${_type}_${slug}`);

    await requestPurge(keysToPurge);

    res.status(200).json({
      message: "Webhook processed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Webhook failed to process",
    });
  }
}

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Executes a batch purge request using the Fastly api
 * @param keys list of surrogate keys to cache
 * @returns void
 */
async function requestPurge(keys: string[]) {
  const combinedKeys = keys.join(" ");
  console.log(`initiating cache purge for ${combinedKeys}`);
  const response = await fetch(`https://api.fastly.com/service/${fastlyServiceId}/purge`, {
    method: "POST",
    headers: {
      "Fastly-Key": fastlyApiKey,
      "surrogate-key": combinedKeys,
    },
  });

  // 'ok' means an http status in 200 range
  if (response.ok) {
    const data = await response.json();
    console.log("cache purge successfully requested", data);
    return true;
  } else {
    console.log("error occurred when calling the Fastly purge api");
  }
}

/**
 * Reads the body of the request as a Stream so the raw body of the webhook can be verified
 * @param readable
 * @returns String representation of the body
 */
async function readBody(readable: NextApiRequest) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}
