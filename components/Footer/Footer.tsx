"use client";
import Link from "next/link";
import css from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>
            Developer:
            <a href="https://github.com/Iryna-Poluhovich" target="_blank">
              Iryna-Poluhovich
            </a>
          </p>
          <p>
            Contact us:
            <Link href="mailto:student@notehub.app">student@notehub.app</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
