import type { ButtonHTMLAttributes, ReactNode } from "react";

type FillVariant = "purple" | "white";
type FillRounded = "full" | "2xl" | "xl";

const roundedStyles: Record<FillRounded, string> = {
  full: "rounded-full",
  "2xl": "rounded-2xl",
  xl: "rounded-xl",
};

const baseStyles: Record<FillVariant, string> = {
  purple: "bg-purple-600 text-white",
  white: "bg-white text-purple-600",
};

const overlayStyles: Record<FillVariant, string> = {
  purple: "bg-white",
  white: "bg-purple-600",
};

const hoverTextStyles: Record<FillVariant, string> = {
  purple: "group-hover:text-purple-600",
  white: "group-hover:text-white",
};

const hoverBorderStyles: Record<FillVariant, string> = {
  purple: "border border-transparent transition-colors group-hover:border-purple-600",
  white: "",
};

interface HoverFillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: FillVariant;
  rounded?: FillRounded;
  labelClassName?: string;
  children: ReactNode;
}

export default function HoverFillButton({
  variant,
  rounded = "full",
  className = "",
  labelClassName = "",
  children,
  type = "button",
  ...buttonProps
}: HoverFillButtonProps) {
  return (
    <button
      {...buttonProps}
      type={type}
      className={`group relative inline-flex items-center justify-center overflow-hidden ${roundedStyles[rounded]} ${baseStyles[variant]} ${hoverBorderStyles[variant]} ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100 ${overlayStyles[variant]}`}
      />
      <span
        className={`relative z-10 transition-colors duration-300 ${hoverTextStyles[variant]} ${labelClassName}`}
      >
        {children}
      </span>
    </button>
  );
}
