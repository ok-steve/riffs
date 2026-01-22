import { html } from "../utils.js";

export default function Note({ answer, onChange }) {
  const guessNote = (guess) => {
    const octave = Math.floor(answer / 12);
    const note = 12 * octave + guess;
    onChange(note);
  };

  return html`
    <div class="cluster">
      <button onClick=${() => guessNote(0)}>C</button>
      <button onClick=${() => guessNote(2)}>D</button>
      <button onClick=${() => guessNote(4)}>E</button>
      <button onClick=${() => guessNote(5)}>F</button>
      <button onClick=${() => guessNote(7)}>G</button>
      <button onClick=${() => guessNote(9)}>A</button>
      <button onClick=${() => guessNote(11)}>B</button>
    </div>
  `;
}
