import { handlers } from "./graphql";
import { groqHandlers } from "./groq/handlers";

/* eslint-disable @typescript-eslint/no-var-requires */

export async function initializeMSW() {
  console.log("[MSW Mock Server] Starting...");
  if (typeof window === "undefined") {
    // Start the Node server
    const { setupServer } = require("msw/node");
    const server = setupServer(...handlers, ...groqHandlers);
    await server.listen();
  } else {
    // Start the Browser server
    const { setupWorker } = require("msw");
    const worker = setupWorker(...handlers, ...groqHandlers);
    await worker.start();
  }
  console.log("[MSW Mock Server] Ready");
}

// TODO: Stall our app from loading until this promise resolves
initializeMSW();
