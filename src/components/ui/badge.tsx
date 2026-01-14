export function Badge({ children, className = "" }: any) {
  return <span className={`badge bg-secondary ${className}`}>{children}</span>;
}
