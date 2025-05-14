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
      className={`text-gray-500 mb-4 w-full flex justify-center items-center ${className}`}
      role="status"
    >
      {message}
    </div>
  );
};
