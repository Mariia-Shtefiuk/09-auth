"use client";

import Image from "next/image";
import css from "./ProfileEdit.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";
import { editMe, EditRequest } from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Routes } from "@/config/routes";
import { isAxiosError } from "axios";

const ProfileEdit = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setError("");
    try {
      const formValues = Object.fromEntries(formData) as EditRequest;
      const response = await editMe(formValues);
      if (response) {
        setUser(response);
        toast.success("You have successfully edited your profile!");
        router.push(Routes.Profile);
      } else {
        setError("Error occured while editing your profile");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.message);
      } else {
        setError("Internal Server Error");
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        {user ? (
          <>
            <h1 className={css.formTitle}>Edit Profile</h1>
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
            <form className={css.profileInfo} action={handleSubmit}>
              <div className={css.usernameWrapper}>
                <label htmlFor="username">{user?.username}:</label>
                <input
                  name="username"
                  type="text"
                  id="username"
                  className={css.input}
                  defaultValue={user.username}
                />
              </div>

              <div className={css.usernameWrapper}>
                <label htmlFor="email">Email: {user?.email}:</label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  className={css.input}
                  defaultValue={user.email}
                  disabled
                />
              </div>

              <div className={css.actions}>
                <button type="submit" className={css.saveButton}>
                  Save
                </button>
                <button
                  type="button"
                  className={css.cancelButton}
                  onClick={() => router.push(Routes.Profile)}
                >
                  Cancel
                </button>
              </div>

              {error && <p className={css.error}>{error}</p>}
            </form>
          </>
        ) : (
          <p>Loading your profile....</p>
        )}
      </div>
    </main>
  );
};

export default ProfileEdit;
