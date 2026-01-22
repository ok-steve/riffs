import { useState } from "preact/hooks";
import { lazy, Suspense } from "preact/compat";
import { html } from "../utils.js";

const Microphone = lazy(() => import("./Microphone.js"));
const Piano = lazy(() => import("./Piano.js"));
const Note = lazy(() => import("./Note.js"));

const components = {
  microphone: Microphone,
  piano: Piano,
  note: Note,
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
      <${Suspense}>
        <${Selected} ...${props} />
      <//>
    </div>
  `;
}
