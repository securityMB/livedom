import type {
  DisplayClassicArgs,
  DisplayDetail,
  DisplayRowArgs,
  Output,
} from "../types";

type DisplayClassic = (...args: DisplayClassicArgs) => Output;
const displayClassic: DisplayClassic = (content, title) => {
  return { content, title };
};

type DisplayRow = (...args: DisplayRowArgs) => Output[];
const displayRow: DisplayRow = (...columns) => {
  return columns.map((args) => {
    const content = Array.isArray(args) ? args[0] : args;
    const title = Array.isArray(args) ? args[1] : undefined;

    return { content, title };
  });
};

export function display(detail: DisplayDetail): Output | Output[] {
  switch (detail.type) {
    case "classic":
      return displayClassic(...detail.args);
    case "row":
      return displayRow(...detail.args);
    default:
      throw new Error("Not implemented");
  }
}
