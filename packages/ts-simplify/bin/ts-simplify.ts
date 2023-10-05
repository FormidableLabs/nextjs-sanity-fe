import { simplifyTypes } from "../src/simplify-types";

declare const process: { argv: string[] };
const [_, __, source, output] = process.argv;
simplifyTypes({ source, output });
