import { useState } from "react";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";

function formatPhone(value) {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("90")) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = digits.slice(1);

  digits = digits.slice(0, 10);

  let result = "+90 ";

  if (digits.length <= 3) {
    result += digits;
  } else if (digits.length <= 6) {
    result += `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else if (digits.length <= 8) {
    result += `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6)}`;
  } else {
    result += `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
  }

  return result;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm({ onSuccess, onError }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // phone change handler
  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);

    if (formatted.length > 0 && formatted.length < 17) {
      setPhoneError(
        t("contactForm.errors.phoneIncomplete") || "Telefon numarası eksik.",
      );
    } else {
      setPhoneError("");
    }
  };

  // email change handler
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);

    if (val.length > 0 && !validateEmail(val)) {
      setEmailError(
        t("contactForm.errors.emailInvalid") || "Geçerli bir e-posta giriniz.",
      );
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const phoneDigits = phone.replace(/\D/g, "").slice(2);
    const isPhoneValid = phone === "" || phoneDigits.length === 10;
    const isEmailValid = validateEmail(email);
    const nextEmailError = isEmailValid
      ? ""
      : t("contactForm.errors.emailInvalid") || "Please enter a valid email.";
    const nextPhoneError = isPhoneValid
      ? ""
      : t("contactForm.errors.phoneIncomplete") || "Phone number is incomplete.";

    setEmailError(nextEmailError);
    setPhoneError(nextPhoneError);

    if (!isEmailValid || !isPhoneValid) {
      return;
    }

    setLoading(true);
    const formData = new FormData(e.target);

    try {
      const res = await fetch("https://formspree.io/f/mvglyqek", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      const data = await res.json();
      if (data.ok) {
        setLoading(false);
        onSuccess();
      } else {
        setLoading(false);
        onError();
      }
    } catch (err) {
      setLoading(false);
      onError();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.input_group}>
        <label className={styles.label} htmlFor="fullname">
          {t("contactForm.labels.fullname")}
        </label>
        <input
          id="fullname"
          className={styles.input}
          name="fullname"
          type="text"
          placeholder={t("contactForm.placeholders.fullname")}
          required
        />
      </div>

      <div className={styles.input_group}>
        <label className={styles.label} htmlFor="company">
          {t("contactForm.labels.company")}
        </label>
        <input
          id="company"
          className={styles.input}
          name="company"
          type="text"
          placeholder={t("contactForm.placeholders.company")}
        />
      </div>

      <div className={styles.input_group}>
        <label className={styles.label} htmlFor="email">
          {t("contactForm.labels.email")}
        </label>
        <input
          id="email"
          className={`${styles.input} ${emailError ? styles.input_error : ""}`}
          name="email"
          type="email"
          placeholder={t("contactForm.placeholders.email")}
          value={email}
          onChange={handleEmailChange}
          aria-invalid={Boolean(submitted && emailError)}
          aria-describedby={emailError ? "email-error" : undefined}
          required
        />
        {submitted && emailError && (
          <span id="email-error" className={styles.error_message}>
            {emailError}
          </span>
        )}
      </div>

      <div className={styles.input_group}>
        <label className={styles.label} htmlFor="phone">
          {t("contactForm.labels.phone")}
        </label>
        <input
          id="phone"
          className={`${styles.input} ${phoneError ? styles.input_error : ""}`}
          name="phone"
          type="tel"
          placeholder="+90 (5__) ___ __ __"
          value={phone}
          onChange={handlePhoneChange}
          aria-invalid={Boolean(submitted && phoneError)}
          aria-describedby={phoneError ? "phone-error" : undefined}
        />
        {submitted && phoneError && (
          <span id="phone-error" className={styles.error_message}>
            {phoneError}
          </span>
        )}
      </div>

      <div className={styles.input_group}>
        <label className={styles.label} htmlFor="subject">
          {t("contactForm.labels.subject")}
        </label>
        <input
          id="subject"
          className={styles.input}
          name="subject"
          type="text"
          placeholder={t("contactForm.placeholders.subject")}
        />
      </div>

      <div className={styles.textarea_group}>
        <label className={styles.label} htmlFor="message">
          {t("contactForm.labels.message")}
        </label>
        <textarea
          id="message"
          className={styles.textarea}
          name="message"
          placeholder={t("contactForm.placeholders.message")}
          required
        />
      </div>

      <button disabled={loading} type="submit" className={styles.button}>
        {loading
          ? t("contactForm.button.loading")
          : t("contactForm.button.idle")}
      </button>
    </form>
  );
}
