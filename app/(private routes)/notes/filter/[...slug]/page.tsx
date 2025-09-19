import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Tags } from "@/lib/api/clientApi";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import { fetchServerNotes } from "@/lib/api/serverApi";

interface NotesFilterProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesFilterProps): Promise<Metadata> {
  const { slug } = await params;
  const currentSlug = slug[0] as keyof typeof descriptions;
  const descriptions = {
    All: `Browse all your notes in one place. Stay organized and access everything instantly with Notehub.`,
    Work: `Manage and share your work notes with ease. Stay productive and organized using Notehub.`,
    Todo: `Keep track of your tasks and to-dos effortlessly. Notehub helps you stay on top of your list.`,
    Personal: `Store and organize your personal notes securely. Notehub makes it simple and private.`,
    Meeting: `Capture and share meeting notes instantly. Stay aligned and productive with Notehub.`,
    Shopping: `Plan and manage your shopping lists in seconds. Notehub keeps your essentials organized.`,
  };
  return {
    title: "NoteHub - Share Notes Instantly Online",
    description: descriptions[currentSlug],
    openGraph: {
      title: "NoteHub - Share Notes Instantly Online",
      description: descriptions[currentSlug],
      siteName: "NoteHub",
      type: "website",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub - Share Notes Instantly Online",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "NoteHub - Share Notes Instantly Online",
      description: descriptions[currentSlug],
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub - Share Notes Instantly Online",
        },
      ],
      creator: "github.com/codingweb123",
    },
  };
}

export default async function NotesFilter({ params }: NotesFilterProps) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const currentSlug = slug[0] as Tags;
  const category = currentSlug === "All" ? undefined : currentSlug;

  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", page: 1, category }],
    queryFn: () => fetchServerNotes(1, "", category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} />
    </HydrationBoundary>
  );
}
