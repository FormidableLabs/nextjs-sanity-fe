import { handlers } from "mocks/handlers";

/* eslint-disable @typescript-eslint/no-var-requires */

if (typeof window === "undefined") {
  // Start the Node server
  const { setupServer } = require("msw/node");
  const server = setupServer(...handlers);
  server.listen();
} else {
  // Start the Browser server
  const { setupWorker } = require("msw");
  const worker = setupWorker(...handlers);
  worker.start();
}
