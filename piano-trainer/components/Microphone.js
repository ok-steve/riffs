import { useEffect, useState } from "preact/hooks";
import * as Pitchfinder from "pitchfinder";
import { html, ftom } from "../utils.js";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

async function getMicrophoneAccess() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return stream;
  } catch (err) {
    console.error("Microphone access denied:", err);
    throw err;
  }
}

async function getAnalyzer(stream) {
  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();

  analyser.fftSize = 2048;
  source.connect(analyser);

  return analyser;
}

const detectPitch = Pitchfinder.YIN({
  sampleRate: audioContext.sampleRate,
});

async function analyze(callback) {
  const analyzer = await getAnalyzer(await getMicrophoneAccess());
  const bufferLength = analyzer.fftSize;
  const dataArray = new Float32Array(bufferLength);

  function pitchDetect() {
    analyzer.getFloatTimeDomainData(dataArray);

    const pitch = detectPitch(dataArray);
    // If pitch is detected, convert to MIDI note number, else null.
    if (pitch) {
      callback(Math.round(ftom(pitch)));
    }

    requestAnimationFrame(pitchDetect);
  }

  pitchDetect();
}

export default function Microphone({ onChange }) {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (audioContext.state !== "running") {
      audioContext.resume();
    }
  }, []);

  useEffect(() => {
    if (isListening) {
      analyze(onChange);
    }
  }, [isListening]);

  return html`
    <button
      aria-pressed="${isListening}"
      onClick=${() => setIsListening(!isListening)}
    >
      ${isListening ? "Stop listening" : "Start listening"}
    </button>
  `;
}
