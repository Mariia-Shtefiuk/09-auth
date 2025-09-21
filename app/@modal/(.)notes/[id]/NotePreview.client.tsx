// "use client";

// import { useRouter, useParams } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";

// import Modal from "@/components/Modal/Modal";
// import { fetchNoteById } from "@/lib/api/clientApi";
// import css from "./NotePreview.module.css";

// // interface NotePreviewClientProps {
// //   id: string;
// // }

// // const NotePreviewClient = ({ id }: NotePreviewClientProps) => {
// //   const router = useRouter();
// //   const onClose = () => router.back();

// //   const {
// //     data: note,
// //     isLoading,
// //     error,
// //   } = useQuery({
// //     queryKey: ["note", id],
// //     queryFn: () => fetchNoteById(id),
// //     refetchOnMount: false,
// //   });

// //   if (isLoading) return <p>Loading, please wait...</p>;
// //   if (error || !note) return <p>Could not fetch note. {error?.message}</p>;

// //   return (
// //     <Modal onClose={onClose}>
// //       <h2>{note.title}</h2>
// //       <b>{note.tag}</b>
// //       <p>{note.content}</p>
// //       <p>{note.updatedAt ?? note.createdAt}</p>
// //     </Modal>
// //   );
// // };

// export default function NotePreviewClient() {
//   const router = useRouter();
//   const onClose = () => router.back();

//   const { id } = useParams<{ id: string }>();

//   // Дані вже гідратовані через HydrationBoundary
//   // Викликаємо useQuery без queryFn, щоб отримати стан із кешу
//   const {
//     data: note,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["note", id],
//     queryFn: () => fetchNoteById(id),
//     // queryFn не вказуємо, дані вже є через HydrationBoundary
//     // refetchOnMount: false також можна залишити для безпечного ререндеру
//     refetchOnMount: false,
//   });

//   if (isLoading) return <p>Loading, please wait</p>;
//   if (!note || error) return <p>Note not found</p>;

//   return (
//     <Modal onClose={onClose}>
//       <div className={css.container}>
//         <h2 className={css.header}>{note.title}</h2>
//         <p className={css.content}>{note.content}</p>
//         <p className={css.date}>{note.createdAt}</p>
//         <p className={css.tag}>{note.tag}</p>

//         <button onClick={close} className={css.backBtn}>
//           Close
//         </button>
//       </div>
//     </Modal>
//   );
// }

"use client";

import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();
  const onClose = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Could not fetch note. {error?.message}</p>;

  return (
    <Modal onClose={onClose}>
      <h2>{note.title}</h2>
      <b>{note.tag}</b>
      <p>{note.content}</p>
      <p>{note.updatedAt ?? note.createdAt}</p>
    </Modal>
  );
}
