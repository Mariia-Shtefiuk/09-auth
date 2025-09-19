"use client";

import css from "./NoteList.module.css";
import type { Note } from "../../types/note";
import { deleteNote } from "@/lib/api/clientApi";
import { Loading } from "notiflix";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const noteDeletion = useMutation({
    mutationFn: async (id: string) => {
      const data = await deleteNote(id);
      return data;
    },
    onSuccess: () => {
      Loading.remove();
      alert("Note has been successfully deleted!");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => {
      Loading.remove();
      alert("Error occured while deleting note!");
    },
  });

  const onDelete = (id: string) => {
    Loading.hourglass();
    noteDeletion.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => {
        return (
          <li key={id} className={css.listItem}>
            <h2 className={css.title}>{title}</h2>
            <p className={css.content}>{content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{tag}</span>
              <Link className={css.tag} href={"/notes/" + id} scroll={false}>
                View details <LoadingIndicator />
              </Link>
              <button className={css.button} onClick={() => onDelete(id)}>
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
