import { setupServer } from "msw/node";
import { rest } from "msw";

export interface InterceptSSRConfig {
  url: string;
  staticResponse: unknown;
}

let mockServer: InterceptHandler;
export function interceptSSRTask(config: InterceptSSRConfig) {
  if (!mockServer) {
    mockServer = new InterceptHandler();
  }
  mockServer.interceptOnce(config);

  return null; // Required by cypress
}

class InterceptHandler {
  private mswServer = this.createServer();
  private queue: InterceptSSRConfig[] = [];

  private createServer() {
    const mswServer = setupServer(
      rest.all("*", (req, res, ctx) => {
        // See if there's an exact match:
        const match = this.queue.find((c) => c.url === req.url.href);
        if (match) {
          // Remove the match from the queue:
          this.queue = this.queue.filter((c) => c !== match);

          const body = match.staticResponse as object;
          return res(ctx.json(body));
        }

        return undefined; // pass-through
      })
    );
    mswServer.listen();
    return mswServer;
  }

  public interceptOnce(config: InterceptSSRConfig) {
    this.queue.push(config);
  }
}
