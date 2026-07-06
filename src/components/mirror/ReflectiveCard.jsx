import { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";

const ReflectiveCard = ({
  blurStrength = 12,
  color = "white",
  metalness = 1,
  roughness = 0.4,
  overlayColor = "rgba(255, 255, 255, 0.1)",
  displacementStrength = 20,
  noiseScale = 1,
  specularConstant = 1.2,
  grayscale = 1,
  glassDistortion = 0,
  className = "",
  style = {},
}) => {
  const videoRef = useRef(null);
  const [consented, setConsented] = useState(false);
  const streamRef = useRef(null);

  useEffect(() => {
    if (!consented) return;

    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: "user",
          },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    startWebcam();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [consented]);

  const baseFrequency = 0.03 / Math.max(0.1, noiseScale);
  const saturation = 1 - Math.max(0, Math.min(1, grayscale));

  const cssVariables = {
    "--blur-strength": `${blurStrength}px`,
    "--metalness": metalness,
    "--roughness": roughness,
    "--overlay-color": overlayColor,
    "--text-color": color,
    "--saturation": saturation,
  };

  return (
    <div
      className={`${styles.reflective_card_container} ${className}`}
      style={{ ...style, ...cssVariables }}
    >
      <svg className={styles.reflective_svg_filters} aria-hidden="true">
        <defs>
          <filter
            id="metallic-displacement"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency={baseFrequency}
              numOctaves="2"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="luminanceToAlpha"
              result="noiseAlpha"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={displacementStrength}
              xChannelSelector="R"
              yChannelSelector="G"
              result="rippled"
            />
            <feSpecularLighting
              in="noiseAlpha"
              surfaceScale={displacementStrength}
              specularConstant={specularConstant}
              specularExponent="20"
              lightingColor="#ffffff"
              result="light"
            >
              <fePointLight x="0" y="0" z="300" />
            </feSpecularLighting>
            <feComposite
              in="light"
              in2="rippled"
              operator="in"
              result="light-effect"
            />
            <feBlend
              in="light-effect"
              in2="rippled"
              mode="screen"
              result="metallic-result"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="solidAlpha"
            />
            <feMorphology
              in="solidAlpha"
              operator="erode"
              radius="45"
              result="erodedAlpha"
            />
            <feGaussianBlur
              in="erodedAlpha"
              stdDeviation="10"
              result="blurredMap"
            />
            <feComponentTransfer in="blurredMap" result="glassMap">
              <feFuncA type="linear" slope="0.5" intercept="0" />
            </feComponentTransfer>
            <feDisplacementMap
              in="metallic-result"
              in2="glassMap"
              scale={glassDistortion}
              xChannelSelector="A"
              yChannelSelector="A"
              result="final"
            />
          </filter>
        </defs>
      </svg>

      {!consented && (
        <div className={styles.reflective_consent}>
          <p className={styles.reflective_consent_text}>
            ● this mirror needs your camera.
          </p>
          <button
            className={styles.reflective_consent_btn}
            onClick={() => setConsented(true)}
          >
            activate mirror
          </button>
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={styles.reflective_video}
        style={{ opacity: consented ? 1 : 0 }}
      />

      <div className={styles.reflective_noise} />
      <div className={styles.reflective_sheen} />
      <div className={styles.reflective_border} />
      <div className={styles.reflective_content} />
    </div>
  );
};

export default ReflectiveCard;
