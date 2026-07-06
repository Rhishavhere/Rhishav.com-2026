/* Site-wide background music: a single <audio> outside the React tree.
   Keeps playing across route changes; starts on user gesture (click) →
   avoids browser autoplay policies. The intro top bar and navbar island
   both control the same audio instance. File: public/assets/audio/ambient.mp3 */

const SRC = "/assets/audio/ambient.mp3";

let audio = null;
const listeners = new Set();

const emit = () => {
  const playing = isMusicPlaying();
  listeners.forEach((fn) => fn(playing));
};

const getAudio = () => {
  if (audio || typeof Audio === "undefined") return audio;
  audio = new Audio(SRC);
  audio.loop = true;
  audio.volume = 0.4;
  audio.preload = "none";
  // Listen for actual play/pause events → subscribers stay in sync even on external changes
  audio.addEventListener("play", emit);
  audio.addEventListener("pause", emit);
  return audio;
};

export const isMusicPlaying = () => !!audio && !audio.paused;

export const subscribeMusic = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export const toggleMusic = async () => {
  const a = getAudio();
  if (!a) return;
  if (a.paused) {
    try {
      await a.play();
    } catch (e) {
      // No user permission or missing file — fail silently, state unchanged
    }
  } else {
    a.pause();
  }
};
