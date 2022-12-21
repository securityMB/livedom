import { TreeDocumentFragment } from "./TreeDocumentFragment";
import { TreeNode } from "./TreeNode";

function getKeyForChildNode(child: ChildNode, index: number) {
  return `${child.nodeName} ${index}`;
}

function getContentDocument(node: Node): Document | null {
  try {
    return (node as HTMLIFrameElement).contentDocument;
  } catch {
    return null;
  }
}

export function TreeChildren({ node }: { node: Node }) {
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
        <TreeNode node={child} key={getKeyForChildNode(child, index)} />
      ))}
      {hasContent && (
        <ul class="ml-4">
          <TreeDocumentFragment description="template content" />
          <TreeChildren node={content!} />
        </ul>
      )}
      {hasContentDocument && (
        <ul class="ml-4">
          <TreeDocumentFragment description="iframe document" />
          <TreeChildren node={contentDocument!} />
        </ul>
      )}
    </ul>
  );
}
