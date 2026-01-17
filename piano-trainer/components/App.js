import { useState } from "preact/hooks";
import { html, pick } from "../utils.js";
import Note from "./Note.js";
import Guess from "./Guess.js";
import Result from "./Result.js";

export default function App() {
  const [options, setOptions] = useState([
    43, 48, 50, 52, 53, 55, 57, 60, 62, 64, 65, 67, 71, 74, 77,
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
    <button class="mx-auto" onClick=${updateNote}>New Note<//>
    <${Guess} answer=${note} onChange=${updateGuess} />
  `;
}
