// @ts-expect-error No types from lodash
import * as _ from "lodash";

export function BigHugeDependency(props: { data: string[] }) {
  const dumb = _(props.data).find((d: string) => d);

  return <p>{dumb}</p>;
}
