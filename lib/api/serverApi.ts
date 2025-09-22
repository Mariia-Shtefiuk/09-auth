import { cookies } from "next/headers";
import { api } from "@/app/api/api";
import { User } from "@/types/user";
import { Note } from "@/types/note";
// import { SortBy, Tags } from "./clientApi";
import { FetchNotesResponse } from "./clientApi";
import { NewNoteData } from "../store/noteStore";

export const fetchServerNotes = async (
  page: number = 1,
  searchQuery: string = "",
  noteTag?: string
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const params: Record<string, string | number> = {
    page,
    search: searchQuery,
    perPage: 12,
  };

  if (noteTag) params.tag = noteTag;
  const res = await api.get<FetchNotesResponse>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const fetchServerNoteById = async (noteid: string): Promise<Note> => {
  const cookieStore = await cookies();

  const res = await api.get<Note>(`notes/${noteid}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();

  const res = await api.get("auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const res = await api.get<User>("users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};
