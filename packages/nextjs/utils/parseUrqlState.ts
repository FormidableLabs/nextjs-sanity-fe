import { SSRData } from "next-urql";

export type WithTypedUrqlState<TQuery> = { urqlState: TypedUrqlState<TQuery> };
export type TypedUrqlState<TQuery> = SSRData & { TQuery?: TQuery };

export function parseUrqlState<TQuery>(urqlState: TypedUrqlState<TQuery>): TQuery {
  const keys = Object.keys(urqlState);
  if (keys.length === 0) throw new Error(`[TypedUrqlState] urqlState did not have any entries`);
  if (keys.length >= 2) throw new Error(`[TypedUrqlState] urqlState had multiple entries (not yet supported) ${keys}`);

  const { data, error } = urqlState[keys[0]];
  if (!data) {
    throw new Error(`[TypedUrqlState] urqlState did not have any data. ${error}`);
  }

  return JSON.parse(data);
}
