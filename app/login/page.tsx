import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AuthForm } from "./AuthForm";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to GitClone and manage repository records."
};

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-center">
          <div>
            <p className="font-mono text-xs font-semibold uppercase text-cyan-glow">
              GitClone Access
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold text-white sm:text-5xl">
              Sign in and manage real repository records.
            </h1>
            <p className="mt-5 text-pretty text-base leading-7 text-muted sm:text-lg">
              Accounts unlock the full dashboard, repository creation, review tracking, and
              deployment records.
            </p>
          </div>
          <AuthForm mode="login" />
        </section>
      </main>
      <Footer />
    </>
  );
}
