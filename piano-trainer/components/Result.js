import { html } from "../utils.js";

export default function Result({ answer, guess }) {
  const hasGuess = answer && guess;
  const isCorrect = hasGuess && answer === guess;

  return html`${hasGuess
    ? html`<p class="result ${isCorrect ? "is-correct" : "is-incorrect"}">
        ${isCorrect ? "Correct!" : "Try again!"}
      </p>`
    : ""}`;
}
