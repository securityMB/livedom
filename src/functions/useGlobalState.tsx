import { useState } from "preact/hooks";
import type { GlobalState, GlobalStateWithUpdaters, Output } from "../types";

export function useGlobalState(
  defaultValues: GlobalState
): GlobalStateWithUpdaters {
  const [input, setInput] = useState(defaultValues.input);
  const [outputs, setOutputs] = useState<Output[]>(defaultValues.outputs);
  const [withNamespaces, setWithNamespaces] = useState(
    defaultValues.withNamespaces
  );
  const [ignoreEmptyTextNodes, setIgnoreEmptyTextNodes] = useState(
    defaultValues.ignoreEmptyTextNodes
  );
  const [parserCode, setParserCode] = useState(defaultValues.parserCode);

  return {
    input,
    setInput,
    outputs,
    setOutputs,
    withNamespaces,
    setWithNamespaces,
    ignoreEmptyTextNodes,
    setIgnoreEmptyTextNodes,
    parserCode,
    setParserCode,
  };
}
