"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

type AuthMode = "login" | "register";

type AuthFormProps = {
  mode: AuthMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const searchParams = useSearchParams();
  const [activeMode, setActiveMode] = useState<AuthMode>(mode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const endpoint = activeMode === "login" ? "/api/auth/login" : "/api/auth/register";
    const body =
      activeMode === "login"
        ? { email, password }
        : {
            name,
            email,
            password
          };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message ?? "Authentication failed");
      }

      window.location.assign(searchParams.get("next") || "/dashboard");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Authentication failed");
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_80px_rgba(3,105,161,0.22)]">
      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-black/20 p-1">
        <button
          type="button"
          onClick={() => setActiveMode("login")}
          className={`min-h-11 rounded-xl px-4 text-sm font-semibold transition ${
            activeMode === "login"
              ? "bg-cyan-glow text-slate-950"
              : "text-muted hover:bg-white/5 hover:text-white"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setActiveMode("register")}
          className={`min-h-11 rounded-xl px-4 text-sm font-semibold transition ${
            activeMode === "register"
              ? "bg-cyan-glow text-slate-950"
              : "text-muted hover:bg-white/5 hover:text-white"
          }`}
        >
          Create Account
        </button>
      </div>

      <form onSubmit={submit} className="mt-6 space-y-4">
        {activeMode === "register" ? (
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-cyan-50">Name</span>
            <input
              required
              minLength={2}
              maxLength={80}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="field-input"
              placeholder="Mira Chen"
            />
          </label>
        ) : null}

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-cyan-50">Email</span>
          <input
            required
            type="email"
            maxLength={160}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="field-input"
            placeholder="you@example.com"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-cyan-50">Password</span>
          <input
            required
            type="password"
            minLength={activeMode === "register" ? 8 : 1}
            maxLength={128}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="field-input"
            placeholder={activeMode === "register" ? "At least 8 characters" : "Your password"}
          />
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-cyan-glow px-5 py-2.5 text-center text-sm font-semibold text-slate-950 shadow-[0_0_34px_rgba(34,211,238,0.34)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading"
            ? "Please wait..."
            : activeMode === "login"
              ? "Sign In"
              : "Create Account"}
        </button>

        <p className={`min-h-6 text-sm ${status === "error" ? "text-rose-signal" : "text-muted"}`}>
          {message}
        </p>
      </form>
    </div>
  );
}
