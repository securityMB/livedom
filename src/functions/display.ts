import type { DisplayDetail, Output } from "../types";

export function display(detail: DisplayDetail): Output {
  if (Array.isArray(detail)) {
    return {
      content: detail[0],
      title: detail[1],
    };
  }
  throw new Error("Not implemented");
}
