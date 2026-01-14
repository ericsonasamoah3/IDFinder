import type { ReactNode } from "react";

type SelectProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
  children: ReactNode;
};

type ItemProps = {
  value: string;
  children: ReactNode;
};

export function Select({
  value = "",
  onValueChange,
  required,
  children,
}: SelectProps) {
  return (
    <select
      className="form-select"
      value={value}
      required={required}
      onChange={(e) => onValueChange?.(e.target.value)}
    >
      {children}
    </select>
  );
}

// Layout wrappers – just passthroughs for compatibility
export function SelectTrigger({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function SelectContent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// Placeholder support
export function SelectValue({
  placeholder = "Select...",
}: {
  placeholder?: string;
}) {
  return (
    <option value="" disabled>
      {placeholder}
    </option>
  );
}

export function SelectItem({ value, children }: ItemProps) {
  return <option value={value}>{children}</option>;
}
