import classNames from "classnames";
import { ForwardedRef, forwardRef, InputHTMLAttributes, ReactNode, useId, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  disabled?: boolean;
  inputEndIcon?: ReactNode;
}

const InputComponent = ({ label, disabled, inputEndIcon, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) => {
  const [isFocused, setIsFocused] = useState(false);
  const id = useId();

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={id} className="text-body-reg mb-2 text-blue font-medium">
          {label}
        </label>
      )}
      <div
        className={classNames(
          "border-blue",
          { border: !isFocused },
          { "border-2": isFocused, "m-[-1px]": isFocused },
          "rounded-[10px]",
          "px-4",
          "py-2",
          "flex"
        )}
      >
        <input
          ref={ref}
          onFocus={() => setIsFocused((val) => true)}
          onBlur={() => setIsFocused((val) => false)}
          className={classNames(
            "bg-yellow text-blue placeholder:text-blue focus:outline-none w-full",
            {
              "border-thunder-cloud text-thunder-cloud placeholder:text-thunder-cloud": disabled,
            },
            "flex-grow"
          )}
          id={id}
          disabled={disabled}
          {...props}
        />
        {inputEndIcon && <div className="inline-block flex-shrink pl-2">{inputEndIcon}</div>}
      </div>
    </div>
  );
};

export const Input = forwardRef(InputComponent);
