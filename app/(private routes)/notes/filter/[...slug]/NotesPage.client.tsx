"use client";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes, Tags } from "@/lib/api/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import css from "./NotesPage.module.css";
import { Routes } from "@/config/routes";
import Link from "next/link";

interface NotesClientProps {
  category: Exclude<Tags[number], "All"> | undefined;
}

const NotesClient = ({ category }: NotesClientProps) => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [page, setPage] = useState<number>(1);
  const {
    data: notes,
    isSuccess,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes", { search: debouncedQuery, page, category }],
    queryFn: () => fetchNotes(debouncedQuery, page, undefined, category),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  const totalPages = notes?.totalPages ?? 1;
  const onQueryChange = useDebouncedCallback((value) => {
    setPage(1);
    setQuery(value);
  }, 300);

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !notes)
    return <p>Could not fetch the list of notes. {error?.message}</p>;

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox onChange={onQueryChange} />
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        )}
        <Link className={css.button} href={Routes.NoteCreate}>
          Create note +
        </Link>
      </header>
      {isSuccess && notes && <NoteList notes={notes.notes} />}
    </div>
  );
};

export default NotesClient;
