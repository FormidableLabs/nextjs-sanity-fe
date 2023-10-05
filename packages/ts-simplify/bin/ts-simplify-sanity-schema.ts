import { compileTypes, simplifyTypes } from "../src/simplify-types";
import { unindent } from "../src/utils/unindent";

declare const process: { argv: string[] };
const [_, __, sanityConfig, outputFile] = process.argv;
const outputText = compileSanityTypes({ sanityConfigFile: sanityConfig });
console.log(outputText);

function compileSanityTypes(config: { sanityConfigFile: string }) {
  return compileTypes({
    sourceFile: config.sanityConfigFile,
    transform({}) {
      return unindent(`
        import sanityConfig from './${config.sanityConfigFile}';
        import { InferSchemaValues } from '@sanity-typed/types';
  
        type SimplifyDeep<T> = T extends object
          ? T extends infer O
            ? { [K in keyof O]: SimplifyDeep<O[K]> }
            : never
          : T;
          
        export type SanitySchema = SimplifyDeep<InferSchemaValues<typeof sanityConfig>>;            
      `);
    },
  });
}
