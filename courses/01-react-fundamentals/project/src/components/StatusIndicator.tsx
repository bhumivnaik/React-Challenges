export interface StatusIndicatorProps {
  status: "completed" | "overdue" | "due-today" | "due-soon";
}

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  return (
    <span className={`status ${status}`}>
      {status}
    </span>
  );
}