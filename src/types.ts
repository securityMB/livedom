import type { StateUpdater } from "preact/hooks";

export type Output = {
  title?: string | undefined;
  content: string | Node;
};

export type GlobalState = {
  input: string;
  parserCode: string;
  outputs: (Output | Output[])[];
  withNamespaces: boolean;
  ignoreEmptyTextNodes: boolean;
};

type Updaters<T> = {
  [P in keyof T & string as `set${Capitalize<P>}`]: StateUpdater<T[P]>;
};

export type GlobalStateUpdaters = Updaters<GlobalState>;

export type GlobalStateWithUpdaters = GlobalState & GlobalStateUpdaters;

export type ShareUrlData = {
  input: string;
  parser: string;
};

export type ParserMenuItem = {
  name: string;
  code: string;
};

export type LocalStorageValues = Omit<GlobalState, "outputs">;

export type DisplayClassicArgs = [Node | string, (string | undefined)?];
//export type DisplayRowArgs = {content: Node | string, title?: string | undefined}[];
export type DisplayRowArgs = (Node | string | DisplayClassicArgs)[];
export type DisplayDetail =
  | { type: "classic"; args: DisplayClassicArgs }
  | { type: "row"; args: DisplayRowArgs };
