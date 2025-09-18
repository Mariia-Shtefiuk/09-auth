import Link from "next/link";
import { getServerMe } from "@/lib/api/serverApi";
import { Routes } from "@/config/routes";
import css from "./ProfilePageStyles.module.css";
import Image from "next/image";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();
  return {
    title: "NoteHub - Share Notes Instantly Online",
    description: `This is your profile ${user.username}. Here your written notes on Notehub. By @Iryna-Poluhovich`,
    openGraph: {
      title: "NoteHub - Share Notes Instantly Online",
      description: `This is your profile ${user.username}. Here your written notes on Notehub. By @Iryna-Poluhovich`,
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
      description: `This is your profile ${user.username}. Here your written notes on Notehub. By @Iryna-Poluhovich`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub - Share Notes Instantly Online",
        },
      ],
      creator: "github.com/Iryna-Poluhovich",
    },
  };
}

const Profile = async () => {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href={Routes.ProfileEdit} className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
