import type { ReactNode } from "react";

export interface BadgeProps {
  children: ReactNode;
  variant?: "priority" | "category" | "tag";
}

export default function Badge({ children, variant }: BadgeProps) {
  return (
    <span className={`badge ${variant}`}>
      {children}
    </span>
  );
}