import { useEffect, useRef } from "preact/hooks";
import Nexus from "nexusui";
import { html } from "../utils.js";

export default function PianoRoll({ onChange }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const piano = new Nexus.Piano(ref.current, {
        size: [500, 125],
        lowNote: 36,
        highNote: 72,
      });

      piano.on("change", ({ note, state }) => {
        if (state) {
          onChange(note);
        }
      });
    }
  }, []);

  return html`<div class="piano-roll" ref=${ref}><//>`;
}
