import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function CardComponent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full border bg-background shadow-xs dark:bg-input/30 dark:border-input rounded-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
