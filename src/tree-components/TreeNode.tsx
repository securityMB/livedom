// type NodeType =
//   | "CDATA_SECTION_NODE"
//   | "PROCESSING_INSTRUCTION_NODE"
//   | "DOCUMENT_FRAGMENT_NODE";

import { classNames } from "../functions/classNames";
import { TreeChildren } from "./TreeChildren";
import { TreeDocumentFragment } from "./TreeDocumentFragment";
import { TreeElement } from "./TreeElement";

type Props = {
  node: Node;
  firstNode?: boolean | undefined;
  withNamespaces: boolean;
  ignoreEmptyTextNodes: boolean;
  description?: string | undefined;
};

export function TypedNode({ node, description, withNamespaces }: Props) {
  switch (node.nodeType) {
    case node.ELEMENT_NODE:
      return (
        <TreeElement node={node as Element} withNamespaces={withNamespaces} />
      );
    case node.TEXT_NODE:
      return (
        <>
          #text: &quot;<span class="text-black">{node.nodeValue}</span>&quot;
        </>
      );
    case node.COMMENT_NODE:
      return (
        <>
          <span class="text-green-700">#comment: {node.nodeValue}</span>
        </>
      );
    case node.DOCUMENT_NODE:
      return <>#document{description && `(${description})`}</>;
    case node.DOCUMENT_TYPE_NODE:
      return <>&lt;!DOCTYPE {node.nodeName}&gt;</>;
    case node.DOCUMENT_FRAGMENT_NODE:
      return <TreeDocumentFragment />;
    case node.CDATA_SECTION_NODE:
      return (
        <>
          #CDATA: &quot;<span class="text-black">{node.nodeValue}</span>&quot;
        </>
      );
    case node.PROCESSING_INSTRUCTION_NODE:
      return (
        <>
          &lt;?{node.nodeName} {node.nodeValue}?&gt;
        </>
      );
  }
  throw new Error(
    `Not implemented node type: ${node.nodeType} ${node.nodeName}`
  );
}

export function TreeNode({
  node,
  firstNode,
  ignoreEmptyTextNodes,
  withNamespaces,
  description,
}: Props) {
  const ignoreThisNode =
    ignoreEmptyTextNodes &&
    node.nodeType === node.TEXT_NODE &&
    (node.nodeValue ?? "").trim() === "";

  if (ignoreThisNode) return <></>;

  return (
    <li
      class={classNames(
        !firstNode &&
          "before:inline-block before:w-1 before:h-3 before:mr-1 border-l border-slate-300"
      )}
    >
      <TypedNode
        node={node}
        ignoreEmptyTextNodes={ignoreEmptyTextNodes}
        withNamespaces={withNamespaces}
        description={description}
        firstNode={firstNode}
      />
      <TreeChildren
        node={node}
        withNamespaces={withNamespaces}
        ignoreEmptyTextNodes={ignoreEmptyTextNodes}
      />
    </li>
  );
}
