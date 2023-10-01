import { Parser } from "./common-types";

import "./commands";
import { SimplifyDeep } from "./type-utils";

export function createGroqBuilder<TSchema>() {
  type DocumentTypes = SimplifyDeep<TSchema[keyof TSchema]>;
  return new GroqBuilder<TSchema, Array<DocumentTypes>>("", null, null);
}

export class GroqBuilder<TSchema, TScope> {
  get TScope(): TScope {
    return null as any;
  }

  /**
   * Extends the GroqBuilder class by implementing methods.
   * This allows for this class to be split across multiple files in the `./commands/` folder.
   * @internal
   */
  static implement(methods: Partial<GroqBuilder<any, any>>) {
    Object.assign(GroqBuilder.prototype, methods);
  }

  protected readonly root: GroqBuilder<TSchema, TScope>;
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
    return new GroqBuilder<TSchema, TScopeNew>(this.query + query, parser, this.root);
  }

  public async execute(fetchData: (query: string) => Promise<unknown>): Promise<TScope> {
    const rawData = await fetchData(this.query);
    const parsed = this.parser?.parse(rawData) || (rawData as TScope);
    return parsed;
  }
}
