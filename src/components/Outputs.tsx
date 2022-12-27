import { memo } from "preact/compat";
import { TreeNode } from "../tree-components/TreeNode";
import type { Output } from "../types";

type Props = {
  outputs: (Output | Output[])[];
  ignoreEmptyTextNodes: boolean;
  withNamespaces: boolean;
};
function Outputs({ outputs, ignoreEmptyTextNodes, withNamespaces }: Props) {
  return (
    <div class="flex flex-col">
      {outputs.map((output) => {
        const row = Array.isArray(output) ? output : [output];
        console.log(row);

        return (
          <div
            class="grid gap-2 border-b-2 pb-2"
            style={{
              gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr)`,
            }}
          >
            {row.map(({ content, title }) => {
              return (
                <div>
                  {title && <div class="font-extrabold text-lg">{title}</div>}
                  {typeof content === "string" ? (
                    <div class="font-mono">{content}</div>
                  ) : (
                    <ul class="font-mono text-gray-400 leading-5">
                      <TreeNode
                        node={content}
                        firstNode
                        ignoreEmptyTextNodes={ignoreEmptyTextNodes}
                        withNamespaces={withNamespaces}
                      />
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default memo(Outputs);
