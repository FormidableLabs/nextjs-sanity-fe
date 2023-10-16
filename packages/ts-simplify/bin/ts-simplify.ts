import fs from "node:fs";
import { parse } from "ts-command-line-args";

import { simplifyTypes } from "../src/simplify-types";

const config = (() => {
  const { source, output, overwrite } = parse(
    {
      source: {
        alias: "s",
        description:
          "A TypeScript file that exports types.  The output will contain compiled versions of these exports.",
        type: String,
        defaultOption: true,
        multiple: true,
      },
      output: {
        alias: "o",
        description: "A .d.ts file for outputting the compiled types.  If omitted, the file will be sent to stdout.",
        type: String,
        defaultValue: "",
      },
      overwrite: {
        alias: "f",
        description: "Overwrite the existing output file",
        type: Boolean,
        defaultValue: false,
      },
      help: { type: Boolean, defaultValue: false, alias: "h", description: "Prints this usage guide" },
    },
    {
      helpArg: "help",
    }
  );
  const sourceFile = source[0];

  const outputFile = output || source[1] || "";
  if (outputFile && !overwrite && fs.existsSync(outputFile)) {
    console.error(`File '${outputFile}' already exists.  Use --overwrite to overwrite it.`);
    process.exit(1);
  }
  return { outputFile, sourceFile };
})();

// Generate the simplified types:
const outputText = simplifyTypes({ sourceFile: config.sourceFile });
// Output the results:
if (config.outputFile) {
  fs.writeFileSync(config.outputFile, outputText);
  console.log(`Created '${config.outputFile}'`);
} else {
  console.log(outputText);
}
