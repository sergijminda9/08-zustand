"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import { useNoteStore } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.push("/notes/filter/all");
    },
    onError: () => {
      setError("Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (formData: FormData) => {
    setError(null);

    const title = String(formData.get("title") ?? "");
    const content = String(formData.get("content") ?? "");
    const tag = formData.get("tag") as NoteTag;

    if (title.trim().length < 3) {
      setError("Title must be at least 3 characters.");
      return;
    }
    if (content.trim().length === 0) {
      setError("Content cannot be empty.");
      return;
    }

    mutate({ title, content, tag });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <label className={css.formGroup}>
        Title
        <input
          className={css.input}
          type="text"
          name="title"
          defaultValue={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
        />
      </label>

      <label className={css.formGroup}>
        Content
        <textarea
          className={css.textarea}
          name="content"
          rows={6}
          defaultValue={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
        />
      </label>

      <label className={css.formGroup}>
        Tag
        <select
          className={css.select}
          name="tag"
          defaultValue={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value as NoteTag })}
        >
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      {error && <p className={css.error}>{error}</p>}

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
