import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost" | "destructive";
  size?: "default" | "icon";
};

export function Button({
  variant = "default",
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  let base = "btn ";

  if (variant === "ghost") base += "btn-light ";
  if (variant === "destructive") base += "btn-danger ";
  if (variant === "default") base += "btn-primary ";

  // shadcn-like size support
  if (size === "icon") base += "p-2 ";

  return <button className={base + className} {...props} />;
}
