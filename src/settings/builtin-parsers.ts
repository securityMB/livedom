type Parser = {
  name: string;
  code: string;
};

const EXPECTED_FIRST_LINE = "// name: ";
function getBuiltinParsers(): Parser[] {
  const parsers = Object.entries(
    import.meta.glob("../parsers/**/*.js", { eager: true, as: "raw" })
  );

  return parsers
    .sort(([name1], [name2]) => name1.localeCompare(name2))
    .map(([originalName, code]) => {
      let name = originalName;
      const firstLine = code.split(/\n/, 1)[0];
      if (firstLine?.startsWith(EXPECTED_FIRST_LINE)) {
        name = firstLine.slice(EXPECTED_FIRST_LINE.length);
      }
      return { name, code };
    });
}

export const builtinParsers = getBuiltinParsers();
