import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  selected?: boolean;
  children: React.ReactNode;
}

export const Pill: React.FC<Props> = ({ disabled, className, selected, children, ...props }) => {
  return (
    <button
      disabled={disabled}
      className={classNames(
        "border text-body-sm rounded-full py-2 px-4 hover:bg-primary hover:text-sky transition transition-colors duration-150",
        {
          "text-primary": !selected,
          "bg-primary text-sky": selected,
          "border-primary": !disabled,
          "border-dark-thunder-cloud text-dark-thunder-cloud": disabled,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
