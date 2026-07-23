"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";

type Props = {
  id: string;
};

export default function NoteDetailsClient({ id }: Props) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <main className={css.main}>
      <div className={css.container}>
        <button
          type="button"
          className={css.backBtn}
          onClick={() => router.back()}
        >
          ← Back
        </button>

        {isLoading && <p>Loading note...</p>}
        {isError && <p>Something went wrong.</p>}

        {note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <span className={css.tag}>{note.tag}</span>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
          </div>
        )}
      </div>
    </main>
  );
}
