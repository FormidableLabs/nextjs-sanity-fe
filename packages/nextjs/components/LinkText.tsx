import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ForwardedRef } from "react";
import * as React from "react";
import classNames from "classnames";

interface BaseProps {
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

function LinkTextComponent(
  { as = "button", disabled, className, ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>
) {
  const styles = classNames(
    "text-body-reg font-bold text-primary hover:border-b",
    {
      "text-dark-thunder-cloud hover:text-dark-thunder-cloud hover:border-b-0": disabled,
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

export const LinkText = React.forwardRef(LinkTextComponent);
