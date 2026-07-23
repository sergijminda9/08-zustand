import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.wrap}>
        <p>&copy; {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <a
          href="https://notehub-public.goit.study/api/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          API Documentation
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
