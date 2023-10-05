import { unindent } from "./utils/unindent";
import { compileTypes } from "./compile-types";
import { logger } from "./utils/logger";

export function simplifyTypes(config: { sourceFile: string }) {
  return compileTypes({
    include: [config.sourceFile],
    sourceCode({ files: [sourceFile] }) {
      const sourceTypes = sourceFile.getTypeAliases().filter((t) => t.isExported());

      logger.info(`Source file exports ${sourceTypes.length} types: ${sourceTypes.map((t) => t.getName()).join(", ")}`);

      return unindent(`
            import * as SOURCES from './${config.sourceFile}';
      
            type SimplifyDeep<T> = T extends (...args: infer A) => infer R
              ? (...args: SimplifyDeep<A>) => SimplifyDeep<R>
              : T extends object
              ? T extends infer O
                ? { [K in keyof O]: SimplifyDeep<O[K]> }
                : never
              : T;
            
            ${sourceTypes
              .map((type) => {
                const name = type.getName();
                return unindent(`
                  export type ${name} = SimplifyDeep<SOURCES.${name}>;
                  //export type ${name} = SOURCES.${name};
                `);
              })
              .join("")}
          `);
    },
  });
}
