import { ExtractRootScope, Parser, RootConfig } from "./common-types";

import "./commands";

export function createGroqBuilder<TRootConfig extends RootConfig>() {
  return new GroqBuilder<ExtractRootScope<TRootConfig["TSchema"]>, TRootConfig>("", null, null);
}

export class GroqBuilder<TScope, TRootConfig extends RootConfig> {
  /**
   * Extends the GroqBuilder class by implementing methods.
   * This allows for this class to be split across multiple files in the `./commands/` folder.
   * @internal
   */
  static implement(methods: Partial<GroqBuilder<any, any>>) {
    Object.assign(GroqBuilder.prototype, methods);
  }

  protected readonly root: GroqBuilder<TScope, TRootConfig>;
  constructor(
    /**
     *
     */
    protected readonly query: string,
    /**
     *
     */
    protected readonly parser: Parser<any, TScope> | null,

    root: GroqBuilder<any, any> | null
  ) {
    this.root = root || this;
  }

  /**
   * This method is for chaining:
   */
  protected extend<TScopeNew>(query: string, parser: Parser<any, any> | null) {
    return new GroqBuilder<TScopeNew, TRootConfig>(this.query + query, parser, this.root);
  }

  public async execute(fetchData: (query: string) => Promise<unknown>): Promise<TScope> {
    const rawData = await fetchData(this.query);
    const parsed = this.parser?.parse(rawData) || (rawData as TScope);
    return parsed;
  }
}
