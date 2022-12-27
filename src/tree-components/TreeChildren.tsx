import { TreeDocumentFragment } from "./TreeDocumentFragment";
import { TreeNode } from "./TreeNode";

function getKeyForChildNode(child: ChildNode, index: number) {
  return `${child.nodeName} ${child.nodeType} ${index}`;
}

function getContentDocument(node: Node): Document | null {
  try {
    return (node as HTMLIFrameElement).contentDocument;
  } catch {
    return null;
  }
}

export function TreeChildren({
  node,
  withNamespaces,
  ignoreEmptyTextNodes,
}: {
  node: Node;
  withNamespaces: boolean;
  ignoreEmptyTextNodes: boolean;
}) {
  const hasChildNodes = node.hasChildNodes();
  const content = (node as HTMLTemplateElement).content as
    | DocumentFragment
    | undefined;
  const hasContent = Boolean(content);
  const contentDocument = getContentDocument(node);
  const hasContentDocument = Boolean(contentDocument);

  const hasAnything = hasChildNodes || hasContent || hasContentDocument;

  if (!hasAnything) return <></>;

  return (
    <ul class="ml-4">
      {Array.from(node.childNodes, (child, index) => (
        <TreeNode
          node={child}
          key={getKeyForChildNode(child, index)}
          ignoreEmptyTextNodes={ignoreEmptyTextNodes}
          withNamespaces={withNamespaces}
        />
      ))}
      {hasContent && (
        <ul class="ml-4">
          <TreeDocumentFragment description="template content" />
          <TreeChildren
            node={content!}
            ignoreEmptyTextNodes={ignoreEmptyTextNodes}
            withNamespaces={withNamespaces}
          />
        </ul>
      )}
      {hasContentDocument && (
        <ul class="ml-4">
          <TreeDocumentFragment description="iframe document" />
          <TreeChildren
            node={contentDocument!}
            ignoreEmptyTextNodes={ignoreEmptyTextNodes}
            withNamespaces={withNamespaces}
          />
        </ul>
      )}
    </ul>
  );
}
