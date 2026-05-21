import Image from "next/image";

type BrandMarkProps = {
  full?: boolean;
  className?: string;
};

export function BrandMark({ full = false, className }: BrandMarkProps) {
  if (full) {
    return (
      <Image
        src="/brand/logo-full.png"
        alt="GitClone"
        width={220}
        height={64}
        priority
        className={className}
      />
    );
  }

  return (
    <Image
      src="/brand/logo-symbol.png"
      alt="GitClone symbol"
      width={48}
      height={48}
      priority
      className={className}
    />
  );
}
