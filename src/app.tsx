import { useEffect, useRef, useState } from "preact/hooks";
import { useConfig } from "./ConfigContext";
import { Settings } from "./settings/Settings";
import iframeCode from "./iframe-code.js?raw";
import { Output } from "./output/Output";
import { getShareDataFromUrl } from "./share-url";

function newIframe(parserCode: string) {
  Function(parserCode); // verify for syntax errors
  const iframe = document.createElement("iframe");
  iframe.className = "w-0 h-0";
  iframe.addEventListener("load", () => {
    const parserCodeElement = document.createElement("script");
    parserCodeElement.id = "parser-code";
    parserCodeElement.type = "parser-code";
    parserCodeElement.text = parserCode;

    const scriptElement = document.createElement("script");
    scriptElement.text = iframeCode;

    iframe.contentDocument!.body.append(parserCodeElement, scriptElement);
  });
  document.body.appendChild(iframe);

  return iframe;
}
export function App() {
  const { parser } = useConfig();
  const shareData = getShareDataFromUrl();

  const [input, setInput] = useState(
    () => shareData?.input ?? localStorage.getItem("input") ?? ""
  );

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    iframeRef.current = newIframe(parser);
    return () => {
      iframeRef.current?.remove();
      iframeRef.current = null;
    };
  }, [parser]);

  useEffect(() => {
    const maxTries = 10;
    let tries = 0;
    const f = async () => {
      while (tries++ < maxTries) {
        try {
          (iframeRef.current?.contentWindow as any)?.parser.parse(input);
          return;
        } catch {}
        await new Promise((r) => setTimeout(r, 333));
      }
    };
    f();
  }, [input, parser]);

  useEffect(() => {
    const listener = () => {
      if (textareaRef.current) {
        localStorage.setItem("input", textareaRef.current.value);
      }
    };
    window.addEventListener("beforeunload", listener);

    return () => window.removeEventListener("beforeunload", listener);
  }, []);

  return (
    <div class="mx-4 flex flex-col h-full gap-4">
      <div class="flex flex-col align-middle items-center gap-2">
        <img
          src="/logo.jpg"
          alt="Logo"
          class="col-span-1 mt-2 shadow-2xl rounded-full h-[140px] border-8 border-slate-300"
        />
        <h1 class="text-5xl text-center tracking-wide font-['Bebas_neue']">
          LiveDOM.NG
        </h1>
      </div>

      <p>
        Enter HTML markup below and compare how it is parsed by various parsers
        and sanitizers.
      </p>
      <textarea
        ref={textareaRef}
        value={input}
        autofocus
        onInput={(ev) => setInput(ev.currentTarget.value)}
      ></textarea>

      <Output input={input} parser={parser} />

      <Settings input={input} />
    </div>
  );
}
