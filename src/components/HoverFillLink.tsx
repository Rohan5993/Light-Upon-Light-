import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

type FillVariant = "purple" | "white" | "ghost";
type FillRounded = "full" | "2xl" | "xl";

const roundedStyles: Record<FillRounded, string> = {
  full: "rounded-full",
  "2xl": "rounded-2xl",
  xl: "rounded-xl",
};

const baseStyles: Record<FillVariant, string> = {
  purple: "bg-purple-600 text-white",
  white: "bg-white text-purple-600",
  ghost: "text-slate-600",
};

const overlayStyles: Record<FillVariant, string> = {
  purple: "bg-white",
  white: "bg-purple-600",
  ghost: "bg-purple-600",
};

const hoverTextStyles: Record<FillVariant, string> = {
  purple: "group-hover:text-purple-600",
  white: "group-hover:text-white",
  ghost: "group-hover:text-white",
};

const hoverBorderStyles: Record<FillVariant, string> = {
  purple: "border border-transparent transition-colors group-hover:border-purple-600",
  white: "",
  ghost: "",
};

interface HoverFillLinkProps extends Omit<LinkProps, "className" | "to"> {
  variant: FillVariant;
  rounded?: FillRounded;
  className?: string;
  labelClassName?: string;
  children: ReactNode;
  to?: string;
  href?: string;
}

export default function HoverFillLink({
  variant,
  rounded = "full",
  className = "",
  labelClassName = "",
  children,
  to,
  href,
  ...linkProps
}: HoverFillLinkProps) {
  const classes = `group relative inline-flex shrink-0 items-center justify-center overflow-hidden ${roundedStyles[rounded]} ${baseStyles[variant]} ${hoverBorderStyles[variant]} ${className}`;
  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100 ${overlayStyles[variant]}`}
      />
      <span
        className={`relative z-10 transition-colors duration-300 ${hoverTextStyles[variant]} ${labelClassName}`}
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
