import type { GlobalState, LocalStorageValues } from "../types";

function save<T extends keyof LocalStorageValues>(
  key: T,
  value: LocalStorageValues[T]
) {
  if (value === null) return;
  if (key === "input" || key === "parserCode") {
    localStorage.setItem(key, value as string);
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
}

export function saveGlobalStateToLocalStorage(state: GlobalState) {
  save("ignoreEmptyTextNodes", state.ignoreEmptyTextNodes);
  save("input", state.input);
  save("parserCode", state.parserCode);
  save("withNamespaces", state.withNamespaces);
}
