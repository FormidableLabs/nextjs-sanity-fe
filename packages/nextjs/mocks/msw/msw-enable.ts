import { handlers } from "./handlers";
import { groqHandlers } from "./groq/handlers";

/* eslint-disable @typescript-eslint/no-var-requires */

if (typeof window === "undefined") {
  // Start the Node server
  const { setupServer } = require("msw/node");
  const server = setupServer(...handlers, ...groqHandlers);
  server.listen();
} else {
  // Start the Browser server
  const { setupWorker } = require("msw");
  const worker = setupWorker(...handlers, ...groqHandlers);
  worker.start();
}
