const colors = [
  {
    bg: "var(--green300)",
    color: "var(--wb50)",
  },
  {
    bg: "var(--main-color400)",
    color: "var(--wb50)",
  },
  {
    bg: "var(--red600)",
    color: "var(--wb50)",
  },
  {
    bg: "var(--pink400)",
    color: "var(--wb50)",
  },
  {
    bg: "var(--darkblue700)",
    color: "var(--wb50)",
  },
  {
    bg: "var(--blue400)",
    color: "var(--wb50)",
  },
  {
    bg: "var(--orange600)",
    color: "var(--wb50)",
  },
  {
    bg: "var(--purple500)",
    color: "var(--wb50)",
  },
];

export const randomColor = () =>
  colors[Math.floor(Math.random() * colors.length)];

export default colors;
