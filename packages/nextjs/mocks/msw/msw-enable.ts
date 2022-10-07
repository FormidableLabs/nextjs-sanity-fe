import { handlers } from "./graphql";
import { groqHandlers } from "./groq/handlers";

/* eslint-disable @typescript-eslint/no-var-requires */

// See https://github.com/mswjs/interceptors/issues/159
const mswUnsupported = process.version.startsWith("v18");
if (mswUnsupported) {
  throw new Error(`[MSW Mock Server] MSW does not support mocking 'fetch' in Node v18`);
}

export async function initializeMSW() {
  console.log("[MSW Mock Server] Starting...");
  if (typeof window === "undefined") {
    // Start the Node server
    const { setupServer } = require("msw/node");
    const server = setupServer(...handlers, ...groqHandlers);
    await server.listen({ onUnhandledRequest: "bypass" });
  } else {
    // Start the Browser server
    const { setupWorker } = require("msw");
    const worker = setupWorker(...handlers, ...groqHandlers);
    await worker.start({ onUnhandledRequest: "bypass" });
  }
  console.log("[MSW Mock Server] Ready");
}

// TODO: Stall our app from loading until this promise resolves
initializeMSW();
