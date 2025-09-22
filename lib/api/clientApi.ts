import { User } from "@/types/user";
import { nextServer } from "./api";
import { Note } from "@/types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const Tags = ["All", "Todo", "Work", "Personal", "Shopping"] as const;

export type Tags = (typeof Tags)[number];
export type SortBy = "created" | "updated";

export type RegisterRequest = {
  email: string;
  password: string;
};

export type EditRequest = {
  email?: string;
  username: string;
};

interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}

type CheckSessionRequest = {
  success: boolean;
};

export const fetchNotes = async (
  search: string,
  page: number = 1,
  perPage: number = 10,
  tag?: Exclude<Tags[number], ""> | undefined,
  sortBy?: SortBy
): Promise<FetchNotesResponse> => {
  try {
    const params: Record<string, string | number> = {
      search,
      page,
      perPage,
    };

    if (tag) params.tag = tag;
    if (sortBy) params.sortBy = sortBy;

    console.log("Request URL:", nextServer.defaults.baseURL + "/notes");
    console.log("Params:", params);
    const { data } = await nextServer.get<FetchNotesResponse>("notes", {
      params,
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw error;
  }
};

export const createNote = async (note: NewNoteData) => {
  try {
    const { title, content, tag } = note;
    const { data } = await nextServer.post<Note>("/notes", {
      title,
      content,
      tag,
    });
    return data;
  } catch (error) {
    console.error("Failed to create note:", error);
    throw error;
  }
};

export const fetchNoteById = async (id: string) => {
  console.log("ID: " + id);
  try {
    const { data } = await nextServer.get<Note>(`/notes/${id}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch note ${id}:`, error);
    throw error;
  }
};

export const deleteNote = async (id: string) => {
  try {
    const { data } = await nextServer.delete<Note>(`/notes/${id}`);
    return data;
  } catch (error) {
    console.error(`Failed to delete note ${id}:`, error);
    throw error;
  }
};

export const getCategories = async () => {
  return Tags;
};

// export const getCategories = async () => {
//   try {
//     const { data } = await nextServer.get<Tags[]>("categories");
//     return data;
//   } catch (error) {
//     console.error("Failed to fetch categories:", error);
//     throw error;
//   }
// };

export const registerUser = async (
  userData: RegisterRequest
): Promise<User> => {
  try {
    const { data } = await nextServer.post<User>("/auth/register", userData);
    return data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const loginUser = async (userData: RegisterRequest): Promise<User> => {
  try {
    const { data } = await nextServer.post<User>("/auth/login", userData);
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const checkSession = async (): Promise<boolean> => {
  try {
    const { data } = await nextServer.get<CheckSessionRequest>("/auth/session");

    return data.success;
  } catch (error) {
    console.error("Session check failed:", error);
    return false;
  }
};

export const getUserProfile = async (): Promise<User> => {
  try {
    await nextServer.post("/auth/logout");
    const { data } = await nextServer.get<User>("/users/me");
    return data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
};

export const editUserProfile = async (userData: EditRequest): Promise<User> => {
  try {
    const { data } = await nextServer.patch<User>("/users/me", userData);
    return data;
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await nextServer.post("/auth/logout");
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};
