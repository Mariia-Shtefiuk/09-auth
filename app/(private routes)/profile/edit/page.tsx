"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { editUserProfile, EditRequest } from "@/lib/api/clientApi";
import css from "./ProfileEditPage.module.css";
import { isAxiosError } from "axios";

function parseFormData(formData: FormData): EditRequest {
  return Object.fromEntries(formData) as EditRequest;
}

function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) return error.message;
  if (error instanceof Error) return error.message;
  return "Internal Server Error";
}

export default function ProfileEditPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEdit = async (formData: FormData) => {
    setError("");
    setLoading(true);

    try {
      const formValues = parseFormData(formData);
      const response = await editUserProfile(formValues);

      if (!response) throw new Error("No response from server");

      setUser(response);
      alert("Profile updated successfully");
      router.push("/profile");
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar?.trim() || "/default-avatar.png"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleEdit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              name="username"
              type="text"
              id="username"
              className={css.input}
              defaultValue={user?.username}
            />
          </div>

          <div className={css.usernameWrapper}>
            <label htmlFor="email">Email: {user?.email}:</label>
            <input
              name="email"
              type="email"
              id="email"
              className={css.input}
              defaultValue={user?.email}
              disabled
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
              {loading && <span className={css.spinner}></span>}
            </button>

            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>

          {error && <p>{error}</p>}
        </form>
      </div>
    </main>
  );
}
