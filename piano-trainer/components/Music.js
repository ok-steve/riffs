import { useEffect, useRef } from "preact/hooks";
import abcjs from "abcjs";
import { html, coinToss, midiToAbcNote } from "../utils.js";

function createAbc(number) {
  const note = midiToAbcNote(number);
  const isTreble = number === 60 ? coinToss() : number >= 60;
  const treble = isTreble ? note : "z";
  const bass = !isTreble ? note : "z";

  return `
    X: 1
    L: 1/1
    %%score {V1 V2}
    [V:V1] ${treble} |]
    [V:V2 clef=bass] ${bass} |]
  `;
}

export default function Music({ number }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const abc = createAbc(number);

      abcjs.renderAbc(ref.current, abc, {
        add_classes: true,
        staffwidth: 100,
      });
    }
  }, [number]);

  return html`<div ref=${ref}><//>`;
}
