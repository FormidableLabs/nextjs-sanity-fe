import classNames from "classnames";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react";

interface BaseProps {
  variant: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: "button";
  };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    as: "a";
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

function ButtonComponent(
  { as = "button", variant, disabled, className, ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>
) {
  const styles = classNames(
    "rounded-lg",
    "py-4",
    "px-8",
    "text-body-reg",
    {
      "bg-blue text-white hover:text-sky": variant === "primary",
      "bg-[transparent] text-blue hover:bg-blue hover:text-sky border border-blue": variant === "secondary",
      "bg-white text-yellow hover:bg-yellow hover:text-blue": variant === "tertiary",
      "bg-thunder-cloud text-dark-thunder-cloud hover:text-dark-thunder-cloud": disabled,
    },
    className
  );

  if (as === "a") {
    const { children, ...linkProps } = props as ButtonAsLink;

    return (
      <a ref={ref as ForwardedRef<HTMLAnchorElement>} className={styles} {...linkProps}>
        {children}
      </a>
    );
  }

  const { children, ...buttonProps } = props as ButtonAsButton;

  return (
    <button ref={ref as ForwardedRef<HTMLButtonElement>} disabled={disabled} className={styles} {...buttonProps}>
      {children}
    </button>
  );
}

export const Button = forwardRef(ButtonComponent);
