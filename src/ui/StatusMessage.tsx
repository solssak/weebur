interface StatusMessageProps {
  message: string;
  className?: string;
}

export const StatusMessage = ({
  message,
  className = '',
}: StatusMessageProps) => {
  return (
    <div
      className={`text-center text-gray-500 py-4 ${className}`}
      role="status"
    >
      {message}
    </div>
  );
};
