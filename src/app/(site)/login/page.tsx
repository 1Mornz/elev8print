"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
        router.push("/account");
      } else {
        const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
        if (loginError) throw loginError;
        router.push("/account");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    }
  };

  return (
    <div className={styles["auth-page"]}>
      <section className={styles["auth-hero"]}>
        <div className={styles["auth-container"]}>
          <div className={styles["auth-content"]}>
            <h1 className={styles["auth-title"]}>
              {isRegister ? "Join Elev8 Print" : "Welcome Back"}
            </h1>
            <p className={styles["auth-subtitle"]}>
              {isRegister
                ? "Create your account to start designing custom stickers and mylar bags"
                : "Sign in to access your orders and continue creating"}
            </p>
          </div>
        </div>
      </section>

      <section className={styles["form-section"]}>
        <div className={styles["form-container"]}>
          <div className={styles["form-card"]}>
            <div className={styles["form-header"]}>
              <h2>{isRegister ? "Create Account" : "Sign In"}</h2>
              <p>{isRegister ? "Get started with your custom printing journey" : "Access your account and orders"}</p>
            </div>

            <form onSubmit={handleAuth} className={styles["auth-form"]}>
              <div className={styles["input-group"]}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles["form-input"]}
                />
              </div>
              <div className={styles["input-group"]}>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles["form-input"]}
                />
              </div>
              <button type="submit" className={styles["auth-button"]}>
                {isRegister ? "Create Account" : "Sign In"}
              </button>
            </form>

            <div className={styles["form-footer"]}>
              <p className={styles["toggle-text"]}>
                {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                <button type="button" onClick={() => setIsRegister(!isRegister)} className={styles["toggle-button"]}>
                  {isRegister ? "Sign In" : "Create Account"}
                </button>
              </p>
            </div>

            {error && (
              <div className={styles["error-message"]}>
                <div className={styles["error-content"]}>
                  <span className={styles["error-icon"]}>⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
