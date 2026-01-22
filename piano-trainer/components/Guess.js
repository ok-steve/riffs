import { useState } from "preact/hooks";
import { html } from "../utils.js";
import Microphone from "./Microphone.js";
import PianoRoll from "./PianoRoll.js";
import SelectNote from "./SelectNote.js";

const components = {
  microphone: Microphone,
  piano: PianoRoll,
  note: SelectNote,
};

export default function Guess(props) {
  const [type, setType] = useState("microphone");
  const Selected = components[type];

  return html`
    <div class="center">
      <div class="cluster mb-0">
        <p>Select input</p>
        ${Object.keys(components).map(
          (key) =>
            html`<button
              aria-pressed="${type === key}"
              onClick=${() => setType(key)}
            >
              ${key}
            </button>`,
        )}
      </div>
      <${Selected} ...${props} />
    </div>
  `;
}
