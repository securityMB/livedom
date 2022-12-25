import { ComponentChildren, createContext } from "preact";
import { StateUpdater, useContext, useEffect, useState } from "preact/hooks";
import { builtinParsers } from "./settings/builtin-parsers";

type ConfigContextType = {
  withNamespaces: boolean;
  setWithNamespaces: StateUpdater<boolean>;
  ignoreEmptyTextNodes: boolean;
  setIgnoreEmptyTextNodes: StateUpdater<boolean>;
  parser: string;
  setParser: StateUpdater<string>;
};
const defaultValue: ConfigContextType = {
  withNamespaces: true,
  setWithNamespaces: () => {},
  ignoreEmptyTextNodes: false,
  setIgnoreEmptyTextNodes: () => {},
  parser: "",
  setParser: () => {},
};

export const ConfigContext = createContext<ConfigContextType>(defaultValue);
export const useConfig = () => useContext(ConfigContext);

type Props = { children: ComponentChildren };
export function ConfigContextProvider({ children }: Props) {
  const [withNamespaces, setWithNamespaces] = useState(() =>
    JSON.parse(localStorage.getItem("withNamespaces") ?? "true")
  );
  const [ignoreEmptyTextNodes, setIgnoreEmptyTextNodes] = useState(() =>
    JSON.parse(localStorage.getItem("ignoreEmptyTextNodes") ?? "true")
  );
  const [parser, setParser] = useState(
    () => localStorage.getItem("parser") ?? builtinParsers[0]!.code
  );

  // Save config before unload
  useEffect(() => {
    const listener = () => {
      localStorage.setItem("withNamespaces", JSON.stringify(withNamespaces));
      localStorage.setItem(
        "ignoreEmptyTextNodes",
        JSON.stringify(ignoreEmptyTextNodes)
      );
      localStorage.setItem("parser", parser);
    };
    window.addEventListener("beforeunload", listener);
    return () => window.removeEventListener("beforeunload", listener);
  }, [withNamespaces, ignoreEmptyTextNodes, parser]);

  return (
    <ConfigContext.Provider
      value={{
        withNamespaces,
        setWithNamespaces,
        ignoreEmptyTextNodes,
        setIgnoreEmptyTextNodes,
        parser,
        setParser,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}
