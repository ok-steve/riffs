import { useState } from "preact/hooks";
import { html, pick } from "../utils.js";
import Note from "./Note.js";
import PianoRoll from "./PianoRoll.js";
import Result from "./Result.js";

export default function App() {
  const [options, setOptions] = useState([
    48, 50, 52, 53, 55, 60, 62, 64, 65, 67,
  ]);
  const [note, setNote] = useState(pick(options));
  const [guess, setGuess] = useState(null);

  const updateNote = () => {
    setNote(pick(options));
    setGuess(null);
  };
  const updateGuess = (value) => {
    if (value && value !== guess) {
      setGuess(value);
    }
  };

  return html`
    <div class="cluster" style="--cluster-justify: center;">
      <${Note} number=${note} />
      <${Note} number=${guess} />
    <//>
    <${Result} answer=${note} guess=${guess} />
    <button onClick=${updateNote}>New Note<//>
    <${PianoRoll} onChange=${updateGuess} />
  `;
}
