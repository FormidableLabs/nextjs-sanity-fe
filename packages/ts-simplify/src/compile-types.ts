import { Project, SourceFile, TypeFormatFlags } from "ts-morph";
import { logger } from "./utils/logger";

export type CompileConfig = {
  include: string[];
  sourceCode: string | ((details: { project: Project; files: SourceFile[] }) => string);
};

export function compileTypes(config: CompileConfig) {
  const project = new Project({
    tsConfigFilePath: "tsconfig.json",
    skipAddingFilesFromTsConfig: true,
  });

  const files: SourceFile[] = [];
  for (const includeFile of config.include) {
    logger.info(`Including file ${includeFile}`);
    const includedFile = project.addSourceFileAtPath(includeFile);
    files.push(includedFile);
  }

  let sourceCode: string;
  if (typeof config.sourceCode === "string") {
    sourceCode = config.sourceCode;
  } else {
    sourceCode = config.sourceCode({ project, files });
  }
  const sourceFile = project.createSourceFile("./source.ts", sourceCode);
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
