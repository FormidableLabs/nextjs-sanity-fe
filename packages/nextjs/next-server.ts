import http from "http";
import next from "next";

/**
 * This script is used by the E2E tests, to run the Next app within the Cypress process itself.
 */
export async function startNextServer({ port = 3000 }) {
  const app = next({ dev: true, dir: __dirname });
  const handleNextRequests = app.getRequestHandler();

  await app.prepare();

  const customServer = new http.Server(async (req, res) => {
    return handleNextRequests(req, res);
  });

  await new Promise<void>((resolve, reject) => {
    customServer.listen(port, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}
