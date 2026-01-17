import { useState } from "preact/hooks";
import { html } from "../utils.js";
import PianoRoll from "./PianoRoll.js";
import SelectNote from "./SelectNote.js";

const components = {
  piano: PianoRoll,
  note: SelectNote,
};

export default function Guess(props) {
  const [type, setType] = useState("note");
  const Selected = components[type];

  return html`
    <div class="mx-auto">
      <div class="cluster mb-0">
        <p>Select input</p>
        <button onClick=${() => setType("piano")}>Piano</button>
        <button onClick=${() => setType("note")}>Note</button>
      </div>
      <${Selected} ...${props} />
    </div>
  `;
}
