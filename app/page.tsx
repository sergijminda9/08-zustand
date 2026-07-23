import Link from "next/link";
import css from "./page.module.css";

export default function Home() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub</h1>
        <p className={css.description}>
          NoteHub helps you organize your thoughts, tasks, and ideas in one
          place. Create, filter, and manage your notes with ease.
        </p>
        <p className={css.description}>
          <Link href="/notes/filter/all">Go to your notes →</Link>
        </p>
      </div>
    </main>
  );
}
