import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="glass-panel max-w-xl rounded-[2rem] p-10 text-center">
        <div className="mx-auto mb-6 flex justify-center">
          <BrandMark />
        </div>
        <p className="font-mono text-sm uppercase text-cyan-glow">
          Route not found
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white">
          This repository path does not exist.
        </h1>
        <p className="mt-4 text-muted">
          Return to the GitClone command center and continue exploring the platform.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-cyan-glow px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.34)] transition hover:scale-[1.03]"
        >
          Back to GitClone
        </Link>
      </div>
    </main>
  );
}
