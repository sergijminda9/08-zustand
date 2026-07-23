"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  // debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  // reset page when tag changes
  useEffect(() => {
    setPage(1);
  }, [tag]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", tag, page, search],
    queryFn: () => fetchNotes({ page, search, tag }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={searchInput} onChange={setSearchInput} />
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </div>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Something went wrong.</p>}
      {data && data.notes.length === 0 && <p>No notes found.</p>}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {data && data.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onChange={setPage}
        />
      )}
    </div>
  );
}
