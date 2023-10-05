import { Project, SourceFile, TypeFormatFlags } from "ts-morph";
import { logger } from "./utils/logger";

export type CompileConfig = {
  include?: string[];
  sourceCode?: string | ((details: { project: Project; files: SourceFile[] }) => string);
  sourceFile?: string;
};

export function compileTypes(config: CompileConfig) {
  const project = new Project({
    tsConfigFilePath: "tsconfig.json",
    skipAddingFilesFromTsConfig: true,
  });

  const files: SourceFile[] = [];
  for (const includeFile of config.include || []) {
    logger.info(`Including file ${includeFile}`);
    const includedFile = project.addSourceFileAtPath(includeFile);
    files.push(includedFile);
  }

  let sourceFile: SourceFile;
  if (config.sourceFile) {
    sourceFile = project.addSourceFileAtPath(config.sourceFile);
  } else if (config.sourceCode) {
    if (typeof config.sourceCode === "string") {
      sourceFile = project.createSourceFile("./source.ts", config.sourceCode);
    } else {
      const sourceCode = config.sourceCode({ project, files });
      sourceFile = project.createSourceFile("./source.ts", sourceCode);
    }
  } else {
    throw new Error(`You must supply either 'sourceCode' or 'sourceFile'`);
  }
  const sourceTypes = sourceFile.getTypeAliases().filter((type) => type.isExported());

  const outputFile = project.createSourceFile("./output.ts");
  logger.info(`Creating ${sourceTypes.length} output types: ${sourceTypes.map((t) => t.getName()).join(", ")}`);
  for (const sourceType of sourceTypes) {
    // Expand the source type into its expanded form:
    const compiledType = sourceType
      .getType()
      .getText(undefined, TypeFormatFlags.UseAliasDefinedOutsideCurrentScope | TypeFormatFlags.NoTruncation);

    outputFile.addTypeAlias({
      name: sourceType.getName(),
      isExported: sourceType.isExported(),
      isDefaultExport: sourceType.isDefaultExport(),
      hasDeclareKeyword: sourceType.hasDeclareKeyword(),
      type: compiledType,
    });
  }

  return outputFile.getText();
}
