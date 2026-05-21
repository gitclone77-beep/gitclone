"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const initialState = {
  name: "",
  owner: "gitclone-labs",
  description: "",
  category: "SaaS",
  language: "TypeScript",
  visibility: "public",
  defaultBranch: "main"
};

type FormState = typeof initialState;

export function RepositoryCreator() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("Creating repository...");

    try {
      const response = await fetch("/api/repositories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("Repository could not be created");
      }

      setForm(initialState);
      setStatus("success");
      setMessage("Repository created and saved to the API service.");
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("API service is not reachable or rejected the request.");
    }
  }

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-5">
      <div>
        <p className="font-mono text-xs uppercase text-cyan-glow">Create repository</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Add a real repository record</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          This form writes to the GitClone API, then refreshes the dashboard data.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Repository name">
          <input
            required
            minLength={2}
            maxLength={80}
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="field-input"
            placeholder="launch-control"
          />
        </Field>
        <Field label="Owner">
          <input
            required
            minLength={2}
            maxLength={80}
            value={form.owner}
            onChange={(event) => updateField("owner", event.target.value)}
            className="field-input"
            placeholder="gitclone-labs"
          />
        </Field>
        <Field label="Category">
          <select
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
            className="field-input"
          >
            {["AI", "Web3", "SaaS", "DeFi", "GameFi", "Bots", "Infrastructure"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Language">
          <input
            required
            maxLength={40}
            value={form.language}
            onChange={(event) => updateField("language", event.target.value)}
            className="field-input"
            placeholder="TypeScript"
          />
        </Field>
        <Field label="Visibility">
          <select
            value={form.visibility}
            onChange={(event) => updateField("visibility", event.target.value)}
            className="field-input"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </Field>
        <Field label="Default branch">
          <input
            required
            maxLength={60}
            value={form.defaultBranch}
            onChange={(event) => updateField("defaultBranch", event.target.value)}
            className="field-input"
            placeholder="main"
          />
        </Field>
      </div>

      <Field label="Description" className="mt-4">
        <textarea
          required
          minLength={4}
          maxLength={240}
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          className="field-input min-h-24 resize-none"
          placeholder="Repository workflow for product teams..."
        />
      </Field>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "saving"}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-cyan-glow px-5 py-2.5 text-center text-sm font-semibold text-slate-950 shadow-[0_0_34px_rgba(34,211,238,0.34)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "saving" ? "Creating..." : "Create Repository"}
        </button>
        <p
          className={`min-h-6 text-sm ${
            status === "error"
              ? "text-rose-signal"
              : status === "success"
                ? "text-mint"
                : "text-muted"
          }`}
        >
          {message}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  className
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block min-w-0 ${className ?? ""}`}>
      <span className="mb-2 block text-sm font-medium text-cyan-50">{label}</span>
      {children}
    </label>
  );
}
