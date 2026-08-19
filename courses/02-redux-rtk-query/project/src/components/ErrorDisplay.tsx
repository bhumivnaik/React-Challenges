/** Stub: Complete Challenge 12 (Error and Loading UX) per README. */

interface ErrorDisplayProps {
  error: unknown;
  onRetry?: () => void;
}

export default function ErrorDisplay({
  error,
  onRetry,
}: ErrorDisplayProps) {
  let message = "Something went wrong.";

  if (error && typeof error === "object" && "data" in error) {
    message = String(error.data);
  }

  if (error instanceof Error) {
    message = error.message;
  }

  return <div id="error-display">
    <p>{message}</p>

    {onRetry && (
      <button type="button" data-testid="retry-btn" onClick={onRetry}>
        Retry
      </button>
    )}
  </div>
}
