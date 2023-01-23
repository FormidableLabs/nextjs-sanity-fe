/**
 * Convert sentences like "hello-formidable-world" or "hello formidable world"
 * to Hello Formidable World
 * @param sentence 
 * @param excludeList List of excluded words
 * @returns 
 */
export const capitalizeWords = (sentence: string, excludeList: string[] = []) => {
  // Get words separated by spaces.
  const words = sentence.replace(/-/g, " ").split(" ");

  const elements = words.reduce((acc: string[], current: string) => {
    // avoid short words like of, is, etc.
    if (excludeList.includes(current)) {
      acc.push(current);
    } else {
        acc.push(`${current.charAt(0).toUpperCase()}${current.substring(1)}`);
    }

    return acc;
  }, []);

  return elements.join(" ");
};
