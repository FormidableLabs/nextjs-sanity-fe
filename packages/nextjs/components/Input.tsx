import classNames from "classnames";
import { ForwardedRef, forwardRef, InputHTMLAttributes, useId } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  disabled?: boolean;
}

const InputComponent = ({ label, disabled, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) => {
  const id = useId();

  return (
    <div className="flex flex-col w-72">
      {label && (
        <label htmlFor={id} className="text-body-reg mb-2 text-blue">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        disabled={disabled}
        className={classNames(
          "border",
          "border-blue",
          "rounded-lg",
          "px-4",
          "py-2",
          "bg-yellow",
          "text-blue",
          "placeholder:text-blue",
          {
            "border-thunder-cloud text-thunder-cloud placeholder:text-thunder-cloud": disabled,
          }
        )}
        {...props}
      />
    </div>
  );
};

export const Input = forwardRef(InputComponent);
