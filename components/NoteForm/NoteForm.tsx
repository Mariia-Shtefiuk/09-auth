"use client";

import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, getCategories, Tags } from "@/lib/api/clientApi";
import { Loading } from "notiflix";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { NewNoteData, useNoteDraftStore } from "@/lib/store/noteStore";
import { useEffect, useState } from "react";
import { Routes } from "@/config/routes";

export default function NoteForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const [categories, setCategories] = useState<Tags>(Tags);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const onCancel = () => {
    router.push(Routes.NotesFilter + "All");
  };

  const formScheme = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title must be less or equal to 50 characters")
      .required("Title is required"),
    content: Yup.string()
      .max(500, "Content must be less or equal to 500 characters")
      .default(""),
    tag: Yup.string().oneOf(categories).default("Todo"),
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      Loading.remove();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push(Routes.NotesFilter + "All");
      toast.success("Note has been successfully created!");
    },
    onError: () => {
      Loading.remove();
      toast.error("Error occured while creating note!");
    },
  });

  const onFormSubmit = async (formData: FormData) => {
    Loading.hourglass();
    try {
      const values = Object.fromEntries(formData) as unknown as NewNoteData;
      const validatedValues = await formScheme.validate(values, {
        abortEarly: false,
      });
      setErrors({});
      mutate(validatedValues);
    } catch (errors) {
      if (errors instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        errors.inner.forEach((error) => {
          if (error.path) newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
    } finally {
      Loading.remove();
    }
  };

  return (
    <form action={onFormSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={draft.title}
          onChange={handleChange}
          className={css.input}
        />
        {errors?.title && <span className={css.error}>{errors.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          rows={8}
          defaultValue={draft.content}
          onChange={handleChange}
          className={css.textarea}
        />
        {errors?.content && <span className={css.error}>{errors.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          name="tag"
          id="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
        >
          {categories
            .filter((tag) => tag !== "All")
            .map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
        </select>
        {errors?.tag && <span className={css.error}>{errors.tag}</span>}
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
