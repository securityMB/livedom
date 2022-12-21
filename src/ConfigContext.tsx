import { ComponentChildren, createContext } from "preact";
import { StateUpdater, useContext, useState } from "preact/hooks";
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
  const [withNamespaces, setWithNamespaces] = useState(true);
  const [ignoreEmptyTextNodes, setIgnoreEmptyTextNodes] = useState(false);
  const [parser, setParser] = useState(() => builtinParsers[0]!.code);

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
