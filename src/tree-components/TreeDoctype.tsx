export function TreeDoctype({ node }: { node: DocumentType }) {
  return <>&lt;!DOCTYPE {node.nodeName}&gt;</>;
}
