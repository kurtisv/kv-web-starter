import * as React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "default" | "wide";
}

const maxWidthMap = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  full: "max-w-full",
};

const paddingMap = {
  none: "",
  default: "px-6",
  wide: "px-8",
};

export function PageContainer({
  children,
  className,
  maxWidth = "xl",
  padding = "default",
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full", maxWidthMap[maxWidth], paddingMap[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
}
