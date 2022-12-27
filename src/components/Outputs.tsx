import { memo } from "preact/compat";
import { TreeNode } from "../tree-components/TreeNode";
import type { Output } from "../types";

type Props = {
  outputs: Output[];
  ignoreEmptyTextNodes: boolean;
  withNamespaces: boolean;
};
function Outputs({ outputs, ignoreEmptyTextNodes, withNamespaces }: Props) {
  return (
    <div class="flex flex-col">
      {outputs.map(({ content, title }) => {
        return (
          <div class="flex flex-col gap-2 border-b pb-2">
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
}

export default memo(Outputs);
