// type NodeType =
//   | "CDATA_SECTION_NODE"
//   | "PROCESSING_INSTRUCTION_NODE"
//   | "DOCUMENT_FRAGMENT_NODE";

import { classNames } from "../functions/classNames";
import { TreeChildren } from "./TreeChildren";
import { TreeComment } from "./TreeComment";
import { TreeDoctype } from "./TreeDoctype";
import { TreeDocument } from "./TreeDocument";
import { TreeDocumentFragment } from "./TreeDocumentFragment";
import { TreeElement } from "./TreeElement";
import { TreeText } from "./TreeText";

type Props = {
  node: Node;
  firstNode?: boolean;
};

const emptyFragment = <></>;

export function TypedNode({ node }: { node: Node }) {
  switch (node.nodeType) {
    case node.ELEMENT_NODE:
      return <TreeElement node={node as Element} />;
    case node.TEXT_NODE:
      return <TreeText node={node as Text} />;
    case node.COMMENT_NODE:
      return <TreeComment node={node as Comment} />;
    case node.DOCUMENT_NODE:
      return <TreeDocument />;
    case node.DOCUMENT_TYPE_NODE:
      return <TreeDoctype node={node as DocumentType} />;
    case node.DOCUMENT_FRAGMENT_NODE:
      return <TreeDocumentFragment />;
  }
  return emptyFragment;
}

export function TreeNode({ node, firstNode }: Props) {
  const ignoreEmptyTextNodes = false;
  const ignoreThisNode =
    ignoreEmptyTextNodes &&
    node.nodeType === node.TEXT_NODE &&
    (node.nodeValue ?? "").trim() === "";

  if (ignoreThisNode) return emptyFragment;

  return (
    <li
      class={classNames(
        !firstNode &&
          "before:inline-block before:w-1 before:h-3 before:mr-1 border-l border-slate-300"
      )}
    >
      <TypedNode node={node} />
      <TreeChildren node={node} />
    </li>
  );
}
