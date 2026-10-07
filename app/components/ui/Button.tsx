import Link from "next/link";
import { cx } from "./cx";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "text";

// Every variant keeps a 44px minimum touch target.
const base =
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "rounded-button bg-deep-blue px-5 text-canvas shadow-raised hover:bg-indigo",
  secondary:
    "rounded-button bg-canvas px-5 text-deep-blue ring-1 ring-inset ring-line-strong hover:bg-surface-1",
  ghost: "rounded-button bg-transparent px-5 text-deep-blue hover:bg-surface-2",
  text: "px-0 text-deep-blue underline underline-offset-4 hover:text-indigo",
};

type SharedProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

type ButtonElementProps = SharedProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type LinkProps = SharedProps & {
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export default function Button(props: ButtonElementProps | LinkProps) {
  const { variant = "primary", className, children, ...rest } = props as ButtonElementProps;
  const classes = cx(base, variants[variant], className);

  if (props.href !== undefined) {
    return (
      <Link href={props.href} onClick={props.onClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" {...rest} className={classes}>
      {children}
    </button>
  );
}
