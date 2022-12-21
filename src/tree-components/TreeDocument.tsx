export function TreeDocument({ description }: { description?: string }) {
  return <>#document{description && `(${description})`}</>;
}
