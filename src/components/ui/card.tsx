import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: Props) {
  return <div className={`card shadow-sm ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = "" }: Props) {
  return <div className={`card-header ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }: Props) {
  return <div className={`card-body ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: Props) {
  return <div className={`h5 m-0 ${className}`}>{children}</div>;
}
