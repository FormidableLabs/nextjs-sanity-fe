import classNames from "classnames";
import { forwardRef } from "react";
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../../utils/polymorphicComponent";

export interface ButtonProps {
  children?: React.ReactNode;
  variant: "primary" | "secondary" | "tertiary" | "text";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

type CombinedProps<T extends React.ElementType> = PolymorphicComponentPropsWithRef<T, ButtonProps>;
type ButtonComponent = <C extends React.ElementType = "button">(props: CombinedProps<C>) => React.ReactElement | null;

const ButtonComponent = <T extends React.ElementType = "button">(
  { as, variant, className, children, leftIcon, rightIcon, ...componentProps }: CombinedProps<T>,
  ref: PolymorphicRef<T>
) => {
  const Component = as || "button";
  const styles = classNames(
    "inline-flex items-center rounded-lg py-4 px-8 text-body-reg transition transition-colors duration-150 text-center",
    {
      "bg-primary text-white hover:text-sky": variant === "primary",
      "bg-[transparent] text-primary hover:bg-primary hover:text-sky border border-primary": variant === "secondary",
      "bg-[transparent] text-primary border border-[transparent] hover:border-primary": variant === "text",
      "bg-[transparent] text-secondary border-secondary border hover:bg-secondary hover:text-primary":
        variant === "tertiary",
      "bg-thunder-cloud text-dark-thunder-cloud hover:text-dark-thunder-cloud": componentProps.disabled,
      "cursor-pointer": as === "a",
    },
    className
  );

  return (
    <Component ref={ref} className={styles} {...componentProps}>
      {leftIcon && <div className="inline pr-2">{leftIcon}</div>}
      {children}
      {rightIcon && <div className="inline pl-2">{rightIcon}</div>}
    </Component>
  );
};

export const Button: ButtonComponent = forwardRef(ButtonComponent);
