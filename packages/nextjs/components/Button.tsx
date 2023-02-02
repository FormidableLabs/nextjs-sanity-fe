import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ForwardedRef } from "react";
import * as React from "react";
import classNames from "classnames";

interface BaseProps {
  variant: "primary" | "secondary" | "tertiary" | "text";
  disabled?: boolean;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
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
  { as = "button", variant, disabled, className, leftIcon: LeftIcon, rightIcon: RightIcon, ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>
) {
  const styles = classNames(
    "inline-flex items-center rounded-lg py-4 px-8 text-body-reg transition transition-colors duration-150 text-center",
    {
      "bg-primary text-white hover:text-sky": variant === "primary",
      "bg-[transparent] text-primary hover:bg-primary hover:text-sky border border-primary": variant === "secondary",
      "bg-[transparent] text-primary border border-[transparent] hover:border-primary": variant === "text",
      "bg-[transparent] text-secondary border-secondary border hover:bg-secondary hover:text-primary":
        variant === "tertiary",
      "bg-thunder-cloud text-dark-thunder-cloud hover:text-dark-thunder-cloud": disabled,
      "cursor-pointer": as === "a",
    },
    className
  );

  if (as === "a") {
    const { children, ...linkProps } = props as ButtonAsLink;

    return (
      <a ref={ref as ForwardedRef<HTMLAnchorElement>} className={styles} {...linkProps}>
        {LeftIcon && <div className="inline pr-2">{LeftIcon}</div>}
        {children}
        {RightIcon && <div className="inline pl-2">{RightIcon}</div>}
      </a>
    );
  }

  const { children, ...buttonProps } = props as ButtonAsButton;

  return (
    <button ref={ref as ForwardedRef<HTMLButtonElement>} disabled={disabled} className={styles} {...buttonProps}>
      {LeftIcon && <div className="inline pr-2">{LeftIcon}</div>}
      {children}
      {RightIcon && <div className="inline pl-2">{RightIcon}</div>}
    </button>
  );
}

export const Button = React.forwardRef(ButtonComponent);
