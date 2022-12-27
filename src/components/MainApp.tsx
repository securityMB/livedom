import { generateShareUrl } from "../functions/generateShareUrl";
import { globalStateForSettings } from "../functions/globalStateForSettings";
import Hero from "./Hero";
import InputBox from "./InputBox";
import Outputs from "./Outputs";
import Settings from "./Settings";
import { useGlobalState } from "../functions/useGlobalState";
import type { DisplayDetail, GlobalState } from "../types";
import { getBuiltinParsers } from "../functions/getBuiltinParsers";
import { getGlobalStateFromLocalStorage } from "../functions/getGlobalStateFromLocalStorage";
import { useEffect, useRef } from "preact/hooks";
import { saveGlobalStateToLocalStorage } from "../functions/saveGlobalStateToLocalStorage";
import { createParserIframe } from "../functions/createParserIframe";
import { display } from "../functions/display";
import { getShareDataFromUrl } from "../functions/getShareDataFromUrl";

const defaultState: GlobalState = {
  input: "",
  parserCode: getBuiltinParsers()[0]?.code!,
  outputs: [],
  withNamespaces: true,
  ignoreEmptyTextNodes: false,
};
const stateFromLocalStorage = getGlobalStateFromLocalStorage();

export function MainApp() {
  const shareData = getShareDataFromUrl();
  const combinedInitialState = {
    ...defaultState,
    ...stateFromLocalStorage,
    ...(shareData?.parser ? { parserCode: shareData?.parser } : {}),
    ...(shareData?.input ? { input: shareData?.input } : {}),
  };

  const globalState = useGlobalState(combinedInitialState);
  const { input, setInput, outputs, parserCode, setOutputs } = globalState;
  const shareUrl = generateShareUrl({
    input: globalState.input,
    parser: globalState.parserCode,
  });

  // Hook: Save on unload
  useEffect(() => {
    // TODO: this is called basically on every keystroke.
    // We should probably use some kind of hack to prevent that
    const listener = () => saveGlobalStateToLocalStorage(globalState);
    window.addEventListener("beforeunload", listener);
    return () => window.removeEventListener("beforeunload", listener);
  }, [globalState]);

  // Hook: Create an iframe with parser code
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  useEffect(() => {
    iframeRef.current = createParserIframe(parserCode);
    return () => {
      iframeRef.current?.remove();
      iframeRef.current = null;
    };
  }, [parserCode]);

  // Hook: Update outputs when the event "display" is dispatched
  // by the parser iframe
  useEffect(() => {
    const listener = (ev: CustomEvent<DisplayDetail>) => {
      const newOutput = display(ev.detail);
      setOutputs((prev) => [...prev, newOutput]);
    };
    window.addEventListener("display", listener as EventListener);
    return () =>
      window.removeEventListener("display", listener as EventListener);
  }, []);

  // Hook: Clear all outputs on input change and re-parse again
  useEffect(() => {
    setOutputs([]);
    if (!iframeRef.current) return;
    // init() method of a parser might call some async code.
    // In those cases parse() method may raise an exception and
    // the output will be empty. We don't want that so try to
    // call it a few times.

    const MAX_TRIES = 10;
    const DELAY = 250;
    const f = async () => {
      let tries = 0;
      while (tries++ < MAX_TRIES) {
        try {
          (iframeRef.current!.contentWindow as any).parser.parse(input);
          return;
        } catch {
          await new Promise((r) => setTimeout(r, DELAY));
        }
      }
    };
    f();
  }, [input, parserCode]);

  return (
    <div class="mx-4 flex flex-col h-full gap-4">
      <Hero />
      <InputBox input={input} setInput={setInput} />
      <Outputs outputs={outputs} />

      <Settings {...globalStateForSettings(globalState)} shareUrl={shareUrl} />
    </div>
  );
}
