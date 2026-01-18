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
         focus:outline-none focus-visible:ring-2 focus-visible:ring-[#541212]
         ${
           active
             ? "bg-[#541212] text-white hover:bg-[#6B1A1A]"
             : "bg-[#1A1818] text-[#E5E5E5] border border-[#2A1F1F] hover:bg-[#2A1F1F] hover:border-[#541212]"
         }
         ${className}
       `}
    >
      {children}
    </button>
  );
}
