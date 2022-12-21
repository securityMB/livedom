export function TreeText({ node }: { node: Text }) {
  return (
    <>
      #text: &quot;<span class="text-black">{node.nodeValue}</span>&quot;
    </>
  );
}
