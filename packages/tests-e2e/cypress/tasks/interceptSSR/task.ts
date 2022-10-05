import { setupServer } from "msw/node";
import { rest } from "msw";

export interface InterceptSSRConfig {
  url: string;
  staticResponse: unknown;
}
export type InterceptSSRResult = ReturnType<typeof interceptSSR>;

class InterceptHandler {
  private mockServer = this.createServer();
  private queue: InterceptSSRConfig[] = [];

  private createServer() {
    const handler = rest.all("*", (req, res, ctx) => {
      console.log("MSW - INTERCEPTED *", req.url);
      const match = this.queue.find((c) => c.url === req.url.href);
      if (match) {
        console.log("MSW - FOUND A MATCH", match);
        this.queue = this.queue.filter((c) => c !== match);

        const body = match.staticResponse as object;
        return res(ctx.json(body));
      }
    });
    const mockServer = setupServer(handler);
    mockServer.listen();
    return mockServer;
  }

  public interceptOnce(config: InterceptSSRConfig) {
    this.queue.push(config);
  }
}

// let mockServer: InterceptHandler | null = null;
const mockServer = new InterceptHandler();
console.log("MSW - Installed handler");

export function interceptSSR(config: InterceptSSRConfig) {
  // if (!mockServer) {
  //   mockServer = new InterceptHandler();
  //   console.log("MSW - Installed handler");
  // }
  mockServer.interceptOnce(config);

  return null; // Required by cypress
}
