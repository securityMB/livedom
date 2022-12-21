export function TreeComment({ node }: { node: Comment }) {
  return (
    <>
      <span class="text-green-700">#comment: {node.nodeValue}</span>
    </>
  );
}
