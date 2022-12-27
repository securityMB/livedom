import iframeCode from "../iframe-code?raw";

export function createParserIframe(parserCode: string) {
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
