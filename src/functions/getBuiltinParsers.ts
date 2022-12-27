import type { ParserMenuItem } from "../types";

const EXPECTED_FIRST_LINE = "// name: ";
let builtinParsers: ParserMenuItem[] | null = null;
export function getBuiltinParsers(): ParserMenuItem[] {
  if (builtinParsers) return builtinParsers;

  const parsers = Object.entries(
    import.meta.glob("../parsers/**/*.js", { eager: true, as: "raw" })
  );

  builtinParsers = parsers
    .sort(([name1], [name2]) => name1.localeCompare(name2))
    .map(([originalName, code]) => {
      let name = originalName;
      const firstLine = code.split(/\n/, 1)[0];
      if (firstLine?.startsWith(EXPECTED_FIRST_LINE)) {
        name = firstLine.slice(EXPECTED_FIRST_LINE.length);
      }
      return { name, code };
    });

  return builtinParsers;
}
