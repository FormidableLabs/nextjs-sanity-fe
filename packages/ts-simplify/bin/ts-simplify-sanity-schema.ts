import { unindent } from "../src/utils/unindent";
import { compileTypes } from "../src/compile-types";

declare const process: { argv: string[] };
const [_, __, sanityConfig, outputFile] = process.argv;
const outputText = compileSanityTypes({ sanityConfigFile: sanityConfig });
console.log(outputText);

function compileSanityTypes(config: { sanityConfigFile: string; exportedAs?: string }) {
  const exportedAs = config.exportedAs || "default";
  const compiledType = compileTypes({
    include: [config.sanityConfigFile],
    sourceCode: unindent(`
        import { InferSchemaValues } from '@sanity-typed/types';
        import { ${exportedAs} as sanityConfig } from './${config.sanityConfigFile}';
  
        type SimplifyDeep<T> = T extends (...args: infer A) => infer R
          ? (...args: SimplifyDeep<A>) => SimplifyDeep<R>
          : T extends object
          ? T extends infer O
            ? { [K in keyof O]: SimplifyDeep<O[K]> }
            : never
          : T;
                  
        export type SanitySchema = SimplifyDeep<InferSchemaValues<typeof sanityConfig>>;            
    `),
  });

  return unindent(`
    // Types generated from "${config.sanityConfigFile}"
    ${compiledType}
  `);
}
