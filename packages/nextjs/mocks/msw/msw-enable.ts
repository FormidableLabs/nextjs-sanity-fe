import { handlers } from "./graphql";
import { groqHandlers } from "./groq/handlers";

/**
 * Importing this file enables MSW.  It works both client-side and server-side.
 */

/* eslint-disable @typescript-eslint/no-var-requires */

// See https://github.com/mswjs/interceptors/issues/159
const mswUnsupported = process.version.startsWith("v18");
if (mswUnsupported) {
  throw new Error(`[MSW Mock Server] MSW does not support mocking 'fetch' in Node v18`);
}

async function initializeMSW() {
  console.log("[MSW Mock Server] Starting...");
  if (typeof window === "undefined") {
    // 'next dev' will compile pages individually, so let's ensure we only install MSW once:
    const isPatchedAlready = Object.getOwnPropertySymbols(require("http")).find(
      (s) => s.toString() === "Symbol(isPatchedModule)"
    );
    if (isPatchedAlready) {
      console.log("[MSW Mock Server] MSW already ready");
      return;
    }

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
