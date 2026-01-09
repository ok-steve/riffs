import { h } from "preact";
import htm from "htm";

export const html = htm.bind(h);

export function coinToss() {
  return Math.random() < 0.5;
}

export function midiToAbcNote(number) {
  if (!number) return "z";

  // Relative octave compared to middle C.
  const relativeOctave = Math.floor(number / 12) - 5;

  const noteNames = [
    "c",
    "^c/_d",
    "d",
    "^d/_e",
    "e",
    "f",
    "^f/_g",
    "g",
    "^g/_a",
    "a",
    "^a/_b",
    "b",
  ];

  let note = noteNames[number % 12];

  if (note.includes("/")) {
    note = note.split("/")[coinToss() ? 0 : 1];
  }

  if (relativeOctave < 1) {
    note = note.toUpperCase();
  }

  if (relativeOctave === 0 || relativeOctave === 1) {
    return note;
  }

  if (relativeOctave > 1) {
    return `${note}${"'".repeat(relativeOctave - 1)}`;
  }

  if (relativeOctave < 0) {
    return `${note}${",".repeat(Math.abs(relativeOctave))}`;
  }
}

export function pick(list = []) {
  return list[Math.floor(Math.random() * list.length)];
}

export function mtof(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export function ftom(freq) {
  return Math.round(12 * Math.log2(freq / 440) + 69);
}
