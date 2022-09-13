import classNames from "classnames";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
}

export const Button: React.FC<Props> = ({ children, variant, disabled, className, ...buttonProps }) => {
  return (
    <button
      disabled={disabled}
      className={classNames(
        "rounded-lg",
        "py-4",
        "px-8",
        "text-body-reg",
        "font-bold",
        {
          "bg-blue text-white hover:text-sky": variant === "primary",
          "bg-white text-blue hover:bg-blue hover:text-sky border border-blue": variant === "secondary",
          "bg-white text-yellow hover:bg-yellow hover:text-blue": variant === "tertiary",
          "bg-thunder-cloud text-dark-thunder-cloud hover:text-dark-thunder-cloud": disabled,
        },
        className
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
