interface ChipProps {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Chip({
  active = false,
  children,
  onClick,
  className = "",
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        shrink-0
        px-5 py-2.5
        sm:px-6 sm:py-3
        text-sm sm:text-base
        font-semibold
        cursor-pointer
        rounded-lg
        transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400
        ${
          active
            ? "bg-neutral-900 text-white"
            : "bg-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}
