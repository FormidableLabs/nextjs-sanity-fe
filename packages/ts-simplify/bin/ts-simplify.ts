import { simplifyTypes } from "../src/simplify-types";

declare const process: { argv: string[] };
const [_, __, sourceFile, outputFile] = process.argv;
const outputText = simplifyTypes({ sourceFile });
console.log(outputText);
