import { useEffect, useState } from "react";
import { isMusicPlaying, subscribeMusic, toggleMusic } from "@/utils/music";

// Small hook subscribed to site-wide music state — shared by intro bar and navbar
export default function useMusic() {
  const [playing, setPlaying] = useState(isMusicPlaying);
  useEffect(() => subscribeMusic(setPlaying), []);
  return { playing, toggle: toggleMusic };
}
