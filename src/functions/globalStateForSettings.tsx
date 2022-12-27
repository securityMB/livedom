import type { GlobalStateWithUpdaters } from "../types";

export function globalStateForSettings(state: GlobalStateWithUpdaters) {
  const { input, setInput, outputs, setOutputs, ...rest } = state;
  return rest;
}
