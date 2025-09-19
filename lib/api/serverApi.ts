import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";
// import { SortBy, Tags } from "./clientApi";
import { FetchNotesResponse } from "./clientApi";

export const fetchServerNotes = async (
  page: number = 1,
  searchQuery: string = "",
  noteTag?: string
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const res = await nextServer.get<FetchNotesResponse>("notes", {
    params: {
      page,
      search: searchQuery,
      tag: noteTag,
      perPage: 12,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const fetchServerNoteById = async (noteid: string): Promise<Note> => {
  const cookieStore = await cookies();

  const res = await nextServer.get<Note>(`notes/${noteid}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get("auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const res = await nextServer.get<User>("users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};
