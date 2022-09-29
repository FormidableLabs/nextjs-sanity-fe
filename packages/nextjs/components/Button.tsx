import classNames from "classnames";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react";

interface BaseProps {
  variant: "primary" | "secondary" | "tertiary" | "text";
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
    "rounded-lg py-4 px-8 text-body-reg transition transition-colors duration-150 text-center",
    {
      "bg-blue text-white hover:text-sky": variant === "primary",
      "bg-[transparent] text-blue hover:bg-blue hover:text-sky border border-blue": variant === "secondary",
      "bg-[transparent] text-blue border border-[transparent] hover:border-blue": variant === "text",
      "bg-[transparent] text-yellow border-yellow border hover:bg-yellow hover:text-blue": variant === "tertiary",
      "bg-thunder-cloud text-dark-thunder-cloud hover:text-dark-thunder-cloud": disabled,
      "cursor-pointer": as === "a",
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
