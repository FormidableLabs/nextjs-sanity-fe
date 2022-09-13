import classNames from "classnames";
import { InputHTMLAttributes, useId } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  disabled?: boolean;
}

export const Input: React.FC<Props> = ({ label, disabled, ...props }) => {
  const id = useId();

  return (
    <div className="flex flex-col w-72">
      <label htmlFor={id} className="text-body-reg mb-2 text-blue">
        {label}
      </label>
      <input
        id={id}
        disabled={disabled}
        className={classNames(
          "border",
          // "focus-visible:outline-blue",
          "ring-blue",
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
