import { capitalizeWords } from "./capitalizeWords";

describe("capitalizeWords", () => {
    it("separated by spaces only", () => {
        const sentence = "hello formidable world";

        const word = capitalizeWords(sentence);

        expect(word).toBe("Hello Formidable World");
    });

    it("separated by hyphens (-) only", () => {
        const sentence = "hello-formidable-world";

        const word = capitalizeWords(sentence);

        expect(word).toBe("Hello Formidable World");
    });

    it("separated by spaces and hyphens (-)", () => {
        const sentence = "hello to the-formidable world";

        const word = capitalizeWords(sentence);

        expect(word).toBe("Hello To The Formidable World");
    });

    it("skipping words in the excludeList", () => {
        const sentence = "hello to the-formidable-world and universe";

        const word = capitalizeWords(sentence, ["to", "and"]);

        expect(word).toBe("Hello to The Formidable World and Universe");
    });
});