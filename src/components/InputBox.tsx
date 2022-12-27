import { memo } from "preact/compat";
import type { StateUpdater } from "preact/hooks";

type Props = { input: string; setInput: StateUpdater<string> };
function InputBox({ input, setInput }: Props) {
  return (
    <textarea
      value={input}
      autofocus
      onInput={(ev) => setInput(ev.currentTarget.value)}
    ></textarea>
  );
}

export default memo(InputBox);
