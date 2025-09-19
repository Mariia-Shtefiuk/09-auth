import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import css from "./ProfilePageStyles.module.css";
import { getServerMe } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "User Profile",
  description:
    "Manage your account information, view your username and email, and update your profile.",
  openGraph: {
    title: "User Profile",
    description: "View and update your account details on NoteHub.",
    url: "/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default async function ProfilePage() {
  let user;
  try {
    user = await getServerMe();
  } catch (error) {
    console.error(error);
  }

  // if (!user) {
  //   return <div className={css.loading}>Loading...</div>;
  // }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href={"/profile/edit"} className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user?.username || "Not set yet"}</p>
          <p>Email: {user?.email || "Not set yet"}</p>
        </div>
      </div>
    </main>
  );
}
