type TreeDocumentFragmentProps = { description?: string };
export function TreeDocumentFragment({
  description,
}: TreeDocumentFragmentProps) {
  return <>#document-fragment {description && `(${description})`}</>;
}
