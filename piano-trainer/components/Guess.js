import { html } from "../utils.js";
// import PianoRoll from "./PianoRoll.js";
import SelectNote from "./SelectNote.js";

export default function Guess(props) {
  // return html`<${PianoRoll} ...${props} />`;
  return html`
    <div class="mx-auto">
      <${SelectNote} ...${props} />
    </div>
  `;
}
