import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

type FillVariant = "purple" | "white" | "ghost" | "outline";
type FillRounded = "full" | "2xl" | "xl";

const roundedStyles: Record<FillRounded, string> = {
  full: "rounded-full",
  "2xl": "rounded-2xl",
  xl: "rounded-xl",
};

const baseStyles: Record<FillVariant, string> = {
  purple: "bg-[#7107E7] text-white",
  white: "bg-white text-[#7107E7]",
  ghost: "text-slate-600",
  outline: "bg-transparent text-black border border-[#7107E7]",
};

const overlayStyles: Record<FillVariant, string> = {
  purple: "bg-white",
  white: "bg-[#7107E7]",
  ghost: "bg-[#7107E7]",
  outline: "bg-white",
};

const hoverTextStyles: Record<FillVariant, string> = {
  purple: "group-hover:text-[#7107E7]",
  white: "group-hover:text-white",
  ghost: "group-hover:text-white",
  outline: "group-hover:text-[#7107E7]",
};

const hoverBorderStyles: Record<FillVariant, string> = {
  purple: "border border-transparent transition-colors group-hover:border-[#7107E7]",
  white: "",
  ghost: "",
  outline: "",
};

interface HoverFillLinkProps extends Omit<LinkProps, "className" | "to"> {
  variant: FillVariant;
  rounded?: FillRounded;
  className?: string;
  labelClassName?: string;
  children: ReactNode;
  to?: string;
  href?: string;
  active?: boolean;
}

export default function HoverFillLink({
  variant,
  rounded = "full",
  className = "",
  labelClassName = "",
  children,
  to,
  href,
  active = false,
  ...linkProps
}: HoverFillLinkProps) {
  const isOutlineActive = variant === "outline" && active;
  const classes = `group relative inline-flex shrink-0 items-center justify-center overflow-hidden ${roundedStyles[rounded]} ${baseStyles[variant]} ${hoverBorderStyles[variant]} transition-[box-shadow,border-color] duration-300 ${
    isOutlineActive ? "!bg-white !text-[#7107E7] !border-[#7107E7] shadow-sm" : "hover:border-[#7107E7]"
  } ${className}`;
  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 origin-bottom transition-transform duration-300 ease-out ${overlayStyles[variant]} ${
          isOutlineActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
        }`}
      />
      <span
        className={`relative z-10 transition-colors duration-300 ${
          isOutlineActive ? "text-[#7107E7]" : hoverTextStyles[variant]
        } ${labelClassName}`}
      >
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...(linkProps as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </a>
    );
  }

  return (
    <Link {...linkProps} to={to ?? "/"} className={classes}>
      {inner}
    </Link>
  );
}
