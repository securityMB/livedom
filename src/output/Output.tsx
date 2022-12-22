import { useEffect, useState } from "preact/hooks";
import { TreeNode } from "../tree-components/TreeNode";

type Detail = [stuff: string | Node, title?: string];

type Props = { input: string; parser: string };
export function Output({ input, parser }: Props) {
  const [outputs, setOutputs] = useState<Detail[]>([]);

  // clear outputs when input change
  useEffect(() => setOutputs([]), [input, parser]);

  useEffect(() => {
    const listener = ((ev: CustomEvent<Detail>) => {
      console.log(ev.detail);
      setOutputs((prev) => [...prev, ev.detail]);
    }) as EventListener;
    window.addEventListener("display", listener);

    return () => window.removeEventListener("display", listener);
  }, []);

  return (
    <div class="flex flex-col">
      {outputs.map((detail) => {
        const [toDisplay, title] = detail;
        return (
          <div class="flex flex-col gap-2 border-b pb-2">
            {title && <div class="font-extrabold text-lg">{title}</div>}
            {typeof toDisplay === "string" ? (
              <div class="font-mono">{toDisplay}</div>
            ) : (
              <ul class="font-mono text-gray-400 leading-5">
                <TreeNode node={toDisplay} firstNode />
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
