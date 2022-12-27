import UntypedEditor, { EditorProps } from "@monaco-editor/react";
import type { FunctionComponent } from "preact";
import { useRef } from "preact/hooks";
import { getBuiltinParsers } from "../functions/getBuiltinParsers";
import type { GlobalStateWithUpdaters } from "../types";

const Editor = UntypedEditor as FunctionComponent<EditorProps>;
export type MonacoEditorRef = Parameters<
  NonNullable<EditorProps["onMount"]>
>["0"];

type Props = Omit<
  GlobalStateWithUpdaters,
  "outputs" | "setOutputs" | "input" | "setInput"
> & { shareUrl: string };
export default function Settings(props: Props) {
  const editorRef = useRef<MonacoEditorRef | null>(null);

  return (
    <details open class="border rounded-md px-4 py-1">
      <summary class="font-bold text-lg cursor-pointer border-b -mx-4 px-4">
        Settings
      </summary>
      <div class="flex flex-col gap-2 p-4">
        <div class="flex items-center gap-2">
          <div>
            Share URL (
            <button
              type="button"
              class="hover:text-gray-500 active:text-gray-200"
              onClick={() => navigator.clipboard.writeText(props.shareUrl)}
            >
              copy
            </button>
            )
          </div>
          <input
            type="text"
            class="flex-1 text-gray-400"
            readonly
            value={props.shareUrl}
          />
        </div>
        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            checked={props.withNamespaces}
            onInput={(ev) => props.setWithNamespaces(ev.currentTarget.checked)}
          />
          Show namespaces
        </label>
        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            checked={props.ignoreEmptyTextNodes}
            onInput={(ev) =>
              props.setIgnoreEmptyTextNodes(ev.currentTarget.checked)
            }
          />
          Ignore empty text nodes
        </label>
        <label class="flex items-center gap-2">
          Parser:
          <select
            value={props.parserCode}
            onChange={(ev) => props.setParserCode(ev.currentTarget.value)}
          >
            {getBuiltinParsers().map(({ name, code }) => {
              return (
                <option key={name + code} value={code}>
                  {name}
                </option>
              );
            })}
          </select>
        </label>
        <div class="border rounded py-2 px-0.5 resize">
          <Editor
            onMount={(editor) => (editorRef.current = editor)}
            className="min-h-[300px]"
            language="javascript"
            options={{ minimap: { enabled: false }, lineNumbers: "off" }}
            value={props.parserCode}
          />
        </div>
        <div class="flex gap-2 items-center">
          <button
            onClick={() =>
              props.setParserCode(editorRef.current?.getValue() ?? "")
            }
            type="button"
            class="bg-gray-300 border-gray-700 border rounded px-2 py-1 uppercase tracking-wide font-semibold hover:bg-opacity-50"
          >
            Update parser
          </button>
          <button
            onClick={() =>
              props.setParserCode(editorRef.current?.getValue() ?? "")
            }
            type="button"
            class="bg-gray-300 border-gray-700 border rounded px-2 py-1 uppercase tracking-wide font-semibold hover:bg-opacity-50"
          >
            Save as custom parser
          </button>
          <input type="text" placeholder="Custom parser name" />
        </div>
      </div>
    </details>
  );
}
