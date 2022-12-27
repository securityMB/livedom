import { Fragment } from "preact";

const asciiLowerCase = (s: string) =>
  s.replace(/[A-Z]+/g, (r) => r.toLowerCase());

const getShortNamespace = (namespace: string) => {
  switch (namespace) {
    case "http://www.w3.org/1999/xhtml":
      return "html";
    case "http://www.w3.org/2000/svg":
      return "svg";
    case "http://www.w3.org/1998/Math/MathML":
      return "math";
    default:
      return namespace;
  }
};

export function TreeElement({ node }: { node: Element }) {
  const withNamespaces = true;
  const namespace = withNamespaces
    ? `${getShortNamespace(node.namespaceURI ?? "")} `
    : "";
  const attrs = [...node.attributes];
  return (
    <>
      &lt;
      <span class="text-purple-700">
        {namespace}
        {asciiLowerCase(node.nodeName)}
      </span>
      {attrs.length > 0 && (
        <>
          {attrs.map((attr) => {
            return (
              <Fragment key={attr.name}>
                {" "}
                <span class="text-yellow-700">{attr.name}</span>=&quot;
                <span class="text-blue-700">{attr.value}</span>
                &quot;
              </Fragment>
            );
          })}
        </>
      )}
      {node.childNodes.length === 0 && " /"}
      &gt;
    </>
  );
}
