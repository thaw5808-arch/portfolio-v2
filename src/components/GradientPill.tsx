import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

/** Black pill with a gradient border, gradient label and pink glow. */
export default function GradientPill({ href, children, className = "" }: Props) {
  return (
    <a href={href} className={`pill ${className}`.trim()}>
      <span>{children}</span>
    </a>
  );
}
