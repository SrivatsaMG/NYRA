import Image from "next/image";

type Variant = "full" | "mark";

const SOURCES: Record<Variant, { src: string; width: number; height: number }> = {
  // full lockup: icon mark + "NYRA CONSTRUCTIONS" wordmark + tagline
  full: { src: "/logo-full.png", width: 321, height: 165 },
  // icon mark only (no text) — for tight spaces like the footer
  mark: { src: "/logo-mark.png", width: 107, height: 165 },
};

export default function Logo({
  variant = "full",
  height = 40,
  className = "",
}: {
  variant?: Variant;
  height?: number;
  className?: string;
}) {
  const { src, width, height: intrinsicHeight } = SOURCES[variant];
  const width_ = Math.round((width / intrinsicHeight) * height);

  return (
    <Image
      src={src}
      alt="NYRA Constructions"
      width={width_}
      height={height}
      className={className}
      priority={variant === "full"}
    />
  );
}
