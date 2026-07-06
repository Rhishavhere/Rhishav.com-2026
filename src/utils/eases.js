import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

/* All app custom eases are defined and registered globally in one place.
   main.jsx imports this once at the top; components access eases by string name:
   ease: "hop" / "butter" / "butterSlow".
   Avoids repeating CustomEase.create calls in every file. */
gsap.registerPlugin(CustomEase);

CustomEase.create("hop", "0.9, 0, 0.1, 1");
CustomEase.create("butter", "0.25, 0.1, 0.25, 1");
CustomEase.create("butterSlow", "0.14, 0.11, 0.11, 1");
