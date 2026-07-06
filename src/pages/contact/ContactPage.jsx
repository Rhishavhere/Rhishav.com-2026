import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import LineReveal from "@/components/reveal/LineReveal";
import styles from "./style.module.css";
import FormContainer from "./form/FormContainer";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.container}>
      <AnimatedSplit
        key={`${i18n.language}-contact-header`}
        text={t("contactPage.header")}
        className={styles.header}
        tagName="h1"
        stagger={0.03}
        duration={1.5}
        start="top 80%"
      />

      <div className={styles.main}>
        <LineReveal
          key={`${i18n.language}-contact-sidebar-title`}
          text={t("contactPage.sidebar_title")}
          className={styles.sidebar_title}
          tagName="p"
          start="top 80%"
        />

        <div className={styles.content}>
          <FormContainer />
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footer_content}>
          <AnimatedSplit
            key={`${i18n.language}-contact-footer-contact`}
            text={t("contactPage.footer_contact")}
            className={styles.footer_content_title}
            tagName="span"
            stagger={0.03}
            duration={1.5}
            start="top 100%"
          />
          <a
            className={styles.contact_link}
            href="mailto:ynsmrkrkmzz@gmail.com"
          >
            <AnimatedSplit
              text="ynsmrkrkmzz@gmail.com"
              tagName="span"
              stagger={0.03}
              duration={1.5}
              start="top 100%"
            />
          </a>
        </div>

        <div className={styles.footer_content}>
          <AnimatedSplit
            key={`${i18n.language}-contact-footer-connect`}
            text={t("contactPage.footer_connect")}
            className={styles.footer_content_title}
            tagName="span"
            stagger={0.03}
            duration={1.5}
            start="top 100%"
          />

          <div className={styles.footer_content_content}>
            <a
              className={styles.contact_link}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/1yunusewre"
            >
              <AnimatedSplit
                text="instagram"
                tagName="span"
                stagger={0.03}
                duration={1.5}
                start="top 100%"
              />
            </a>
            <AnimatedSplit
              text=","
              className={styles.comma}
              tagName="span"
              stagger={0.03}
              duration={1.5}
              start="top 100%"
            />
            <a
              className={styles.contact_link}
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/yeqqv2"
            >
              <AnimatedSplit
                text="github"
                tagName="span"
                stagger={0.03}
                duration={1.5}
                start="top 100%"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
