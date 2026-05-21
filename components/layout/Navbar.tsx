"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/api/auth/me", {
      cache: "no-store"
    })
      .then((response) => response.json())
      .then((payload) => {
        if (!active) return;
        setUserName(payload?.data?.user?.name ?? null);
      })
      .catch(() => {
        if (active) setUserName(null);
      })
      .finally(() => {
        if (active) setAuthLoaded(true);
      });

    return () => {
      active = false;
    };
  }, []);

  async function signOut() {
    await fetch("/api/auth/logout", {
      method: "POST"
    });
    setUserName(null);
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center"
          aria-label="GitClone home"
        >
          <Image
            src="/brand/logo-full.png"
            alt="GitClone"
            width={190}
            height={55}
            priority
            className="h-auto w-44 shrink-0 drop-shadow-[0_0_20px_rgba(34,211,238,0.24)] sm:w-48"
          />
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] p-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {userName ? (
            <>
              <ButtonLink href="/dashboard" variant="ghost">
                {userName}
              </ButtonLink>
              <button
                type="button"
                onClick={signOut}
                className="inline-flex min-h-11 min-w-0 items-center justify-center rounded-full border border-cyan-glow/30 bg-white/5 px-5 py-2.5 text-center text-sm font-semibold leading-5 text-white transition duration-300 hover:scale-[1.03] hover:border-cyan-glow/70 hover:bg-cyan-glow/10 focus:outline-none focus:ring-2 focus:ring-cyan-glow/70 focus:ring-offset-2 focus:ring-offset-background"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <ButtonLink href="/login" variant="ghost">
                Sign In
              </ButtonLink>
              <ButtonLink href="/register">
                {authLoaded ? "Start Building" : "Start Building"}
              </ButtonLink>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-glow/25 bg-white/5 text-white transition hover:border-cyan-glow/70 md:hidden"
        >
          <span className="relative h-4 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition",
                open && "top-2 rotate-45"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-2 h-0.5 w-5 rounded-full bg-current transition",
                open && "opacity-0"
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current transition",
                open && "bottom-1.5 -rotate-45"
              )}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <div className="grid gap-3 pt-3">
                {userName ? (
                  <>
                    <ButtonLink href="/dashboard" variant="secondary" className="w-full">
                      Dashboard
                    </ButtonLink>
                    <button
                      type="button"
                      onClick={signOut}
                      className="inline-flex min-h-11 w-full min-w-0 items-center justify-center rounded-full border border-cyan-glow/30 bg-white/5 px-5 py-2.5 text-center text-sm font-semibold leading-5 text-white transition duration-300 hover:border-cyan-glow/70 hover:bg-cyan-glow/10"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <ButtonLink href="/login" variant="secondary" className="w-full">
                      Sign In
                    </ButtonLink>
                    <ButtonLink href="/register" className="w-full">
                      Start Building
                    </ButtonLink>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
