import type { LocalStorageValues } from "../types";

function get<T extends keyof LocalStorageValues>(
  key: T
): Partial<LocalStorageValues>[T] {
  const value = localStorage.getItem(key);
  if (value === null) return;
  if (key === "input" || key === "parserCode") return value as never;
  return JSON.parse(value);
}

export function getGlobalStateFromLocalStorage(): Partial<LocalStorageValues> {
  const obj = {
    ignoreEmptyTextNodes: get("ignoreEmptyTextNodes"),
    input: get("input"),
    parserCode: get("parserCode"),
    withNamespaces: get("withNamespaces"),
  };
  const withoutUndefined = Object.entries(obj).filter(
    ([, v]) => v !== undefined
  );
  return Object.fromEntries(withoutUndefined);
}
