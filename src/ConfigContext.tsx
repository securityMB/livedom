import { ComponentChildren, createContext } from "preact";
import { StateUpdater, useContext, useEffect, useState } from "preact/hooks";
import { builtinParsers } from "./settings/builtin-parsers";
import { getShareDataFromUrl } from "./share-url";

type ConfigGetter = {
  withNamespaces: boolean;
  ignoreEmptyTextNodes: boolean;
  parser: string;
};

type Updaters<T> = {
  [P in keyof T & string as `set${Capitalize<P>}`]: StateUpdater<T[P]>;
};

type ConfigUpdater = Updaters<ConfigGetter>;

type ConfigContextType = ConfigGetter & ConfigUpdater;
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
function saveConfig<T extends keyof ConfigGetter>(
  prop: T,
  value: ConfigGetter[T]
) {
  localStorage.setItem(
    prop,
    typeof value === "string" ? value : JSON.stringify(value)
  );
}

function getConfig<T extends keyof ConfigGetter>(
  prop: T,
  defaultValue: ConfigGetter[T]
): ConfigGetter[T] {
  const value = localStorage.getItem(prop);
  if (value === null) return defaultValue;
  if (typeof defaultValue === "string") return value as any;
  return JSON.parse(value);
}

type Props = { children: ComponentChildren };
export function ConfigContextProvider({ children }: Props) {
  const shareData = getShareDataFromUrl();

  const [withNamespaces, setWithNamespaces] = useState(() =>
    getConfig("withNamespaces", true)
  );
  const [ignoreEmptyTextNodes, setIgnoreEmptyTextNodes] = useState(() =>
    getConfig("ignoreEmptyTextNodes", false)
  );
  const [parser, setParser] = useState(
    getConfig("parser", shareData?.parser ?? builtinParsers[0]!.code)
  );

  // Save config before unload
  useEffect(() => {
    const listener = () => {
      saveConfig("withNamespaces", withNamespaces);
      saveConfig("ignoreEmptyTextNodes", ignoreEmptyTextNodes);
      saveConfig("parser", parser);
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
