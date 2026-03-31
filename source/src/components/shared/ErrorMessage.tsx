import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <div className="flex flex-col items-center justify-center gap-4 py-20">
    <div className="flex items-center gap-2 text-destructive">
      <AlertCircle className="h-5 w-5" />
      <p className="font-medium">{message}</p>
    </div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
      >
        Try Again
      </button>
    )}
  </div>
);

export default ErrorMessage;
