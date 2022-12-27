import { Fragment } from "preact";
import { getShortNamespace } from "../functions/getShortNamespace";
import { asciiLowerCase } from "../functions/asciiLowerCase";

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
