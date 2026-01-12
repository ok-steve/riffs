import { useEffect, useRef } from "preact/hooks";
import { html } from "../utils.js";
import "../../public/components/toast.js";

export default function Result({ answer, guess }) {
  const ref = useRef(null);
  const hasGuess = answer && guess;
  const isCorrect = hasGuess && answer === guess;

  useEffect(() => {
    const toast = ref.current;

    if (hasGuess) {
      toast.open(isCorrect ? "Correct!" : "Try again!");
    }
  }, [isCorrect]);

  return html`<r-toast
    class=${isCorrect ? "is-correct" : "is-incorrect"}
    ref=${ref}
  ></r-toast>`;
}
