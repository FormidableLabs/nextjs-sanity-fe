export function unindent(str: string) {
  const lines = str.split("\n");
  const indent = lines[1].match(/^\s*/)![0];
  return lines.map((line) => line.replace(indent, "")).join("\n");
}
