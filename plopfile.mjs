import path from "node:path";
import * as glob from "glob";
import autocompletePrompt from "inquirer-autocomplete-prompt";

const PACKAGES_NEXTJS = "./packages/nextjs";

/**
 * @param {import("plop").NodePlopAPI} plop
 */
export default function (plop) {
  plop.setPrompt("autocomplete", autocompletePrompt);
  plop.setGenerator("stories", {
    description: "Generates a Storybook stories file for a component",
    prompts: [
      {
        name: "COMPONENT",
        message: "Create a Stories file for which component? (you can search with wildcards)",
        type: "autocomplete",
        loop: false,
        async source(answers, searchTerms) {
          return glob
            .sync(`components/**/*${searchTerms || ""}*`, {
              cwd: PACKAGES_NEXTJS,
              nodir: true,
              nocase: true,
            })
            .map((file) => {
              const COMPONENT = {
                FILE: file,
                DIRNAME: path.dirname(file),
                BASENAME: path.basename(file, path.extname(file)),
              };
              return {
                name: file,
                value: COMPONENT,
              };
            });
        },
        validate(input, _answers) {
          const COMPONENT = input.value;
          if ([".stories", ".test"].some((end) => COMPONENT.BASENAME.endsWith(end))) {
            return `This does not appear to be a Component file: "${input.name}"`;
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: "add",
        templateFile: `${PACKAGES_NEXTJS}/__plop_templates/COMPONENT.stories.tsx.hbs`,
        path: `${PACKAGES_NEXTJS}/{{COMPONENT.DIRNAME}}/{{COMPONENT.BASENAME}}.stories.tsx`,
      },
    ],
  });
}
