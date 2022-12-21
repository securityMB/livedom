import UntypedEditor, { EditorProps } from "@monaco-editor/react";
import type { FunctionComponent } from "preact";
import { useRef } from "preact/hooks";
import { useConfig } from "../ConfigContext";
import { builtinParsers } from "./builtin-parsers";

const Editor = UntypedEditor as FunctionComponent<EditorProps>;
export type MonacoEditorRef = Parameters<
  NonNullable<EditorProps["onMount"]>
>["0"];

export function Settings() {
  const config = useConfig();
  const editorRef = useRef<MonacoEditorRef | null>(null);
  return (
    <details open class="border rounded-md px-4 py-1">
      <summary class="font-bold text-lg cursor-pointer border-b -mx-4 px-4">
        Settings
      </summary>
      <div class="flex flex-col gap-2 p-4">
        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            checked={config.withNamespaces}
            onInput={(ev) => config.setWithNamespaces(ev.currentTarget.checked)}
          />
          Show namespaces
        </label>
        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            checked={config.ignoreEmptyTextNodes}
            onInput={(ev) =>
              config.setIgnoreEmptyTextNodes(ev.currentTarget.checked)
            }
          />
          Ignore empty text nodes
        </label>
        <label class="flex items-center gap-2">
          Parser:
          <select
            value={config.parser}
            onChange={(ev) => config.setParser(ev.currentTarget.value)}
          >
            {builtinParsers.map(({ name, code }) => {
              return (
                <option key={name + code} value={code}>
                  {name}
                </option>
              );
            })}
          </select>
        </label>
        <Editor
          onMount={(editor) => (editorRef.current = editor)}
          height="30vh"
          language="javascript"
          options={{ minimap: { enabled: false } }}
          value={config.parser}
        />
        <div>
          <button
            onClick={() =>
              config.setParser(editorRef.current?.getValue() ?? "")
            }
            type="button"
            class="bg-slate-100 border rounded p-2 uppercase tracking-wide font-semibold hover:bg-slate-300"
          >
            Update parser
          </button>
        </div>
      </div>
    </details>
  );
}
