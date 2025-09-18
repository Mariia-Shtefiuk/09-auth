"use client";
import { registerUser, RegisterRequest } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import css from "./SignUpPage.module.css";

export default function SignUpPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setError("");
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const user = await registerUser(formValues);
      if (user) {
        setUser(user);
        alert("Registration completed successfully");
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof Error) setError(error.message);
      else setError("Server error");
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
