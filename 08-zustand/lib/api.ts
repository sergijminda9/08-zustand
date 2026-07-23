import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const authHeaders = () => ({
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export const fetchNotes = async ({
  page,
  perPage = 12,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };

  if (search) {
    params.search = search;
  }

  // бекенд не очікує тег "all" — його взагалі не передаємо
  if (tag && tag !== "all") {
    params.tag = tag;
  }

  const res = await axios.get<FetchNotesResponse>("/notes", {
    params,
    headers: authHeaders(),
  });

  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${id}`, {
    headers: authHeaders(),
  });
  return res.data;
};

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const res = await axios.post<Note>("/notes", payload, {
    headers: authHeaders(),
  });
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${id}`, {
    headers: authHeaders(),
  });
  return res.data;
};
