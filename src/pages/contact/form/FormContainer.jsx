import { useRef, useState } from "react";
import gsap from "gsap";

import ContactForm from "./contact/ContactForm";
import SuccessBox from "./success/SuccessBox";
import styles from "./style.module.css";

export default function FormContainer() {
    const [success, setSuccess] = useState(false);
    const [errorShake, setErrorShake] = useState(false);

    const formWrapperRef = useRef(null);
    const successWrapperRef = useRef(null);

    // WHEN FORM IS SUBMITTED SUCCESSFULLY
    const handleSuccess = () => {
        const tl = gsap.timeline({
            defaults: { ease: "hop" }
        });

        // form shrink + slide-out (no fade)
        tl.to(formWrapperRef.current, {
            y: 40,
            scale: 0.92,
            duration: 0.4,
            clipPath: "inset(0 0 100% 0)",
        });

        tl.set(formWrapperRef.current, { display: "none" });

        setSuccess(true);

        tl.fromTo(
            successWrapperRef.current,
            {
                y: 40,
                scale: 0.9,
                clipPath: "inset(0 0 100% 0)",
            },
            {
                y: 0,
                scale: 1,
                clipPath: "inset(0 0 0% 0)",
                duration: 0.6,
                ease: "hop",
            }
        );
    };

    const handleError = () => {
        if (!formWrapperRef.current) return;

        gsap.fromTo(
            formWrapperRef.current,
            { x: -12 },
            {
                x: 0,
                duration: 0.25,
                ease: "elastic.out(1, 0.2)",
                onStart: () => setErrorShake(true),
                onComplete: () => setErrorShake(false),
            }
        );
    };

    return (
        <div className={styles.wrapper}>
            {/* FORM */}
            <div
                ref={formWrapperRef}
                className={`${styles.formWrapper} ${errorShake ? styles.shake : ""}`}
            >
                <ContactForm
                    onSuccess={handleSuccess}
                    onError={handleError}
                />
            </div>

            {/* SUCCESS */}
            {success && (
                <div ref={successWrapperRef} className={styles.successWrapper}>
                    <SuccessBox />
                </div>
            )}
        </div>
    );
}
