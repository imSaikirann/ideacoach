import React from "react";
import clsx from "clsx";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  as?: React.ElementType;
};

const sizeClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[90rem]",
  full: "max-w-none",
};

export default function Container({
  children,
  className,
  size = "lg",
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={clsx(
        "mx-auto w-full ",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  );
}
