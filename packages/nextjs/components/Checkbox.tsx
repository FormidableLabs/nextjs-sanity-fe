import * as React from "react";
import classNames from "classnames";
import { InputHTMLAttributes, useId } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export const Checkbox: React.FC<Props> = ({ name, label, ...checkboxInputProps }) => {
  const id = useId();
  return (
    <div className="inline-flex items-center my-2">
      <input
        type="checkbox"
        name={name}
        id={id}
        className={classNames(
          "peer w-6 min-w-[24px] h-6 min-h-[24px] border border-primary",
          // Styles for custom checkbox
          "rounded appearance-none checked:bg-primary",
          // Custom checkbox icon, defined in tailwind.config.js
          "checked:bg-checkbox-checked checked:bg-no-repeat checked:bg-center checked:border-[transparent]"
        )}
        {...checkboxInputProps}
      />

      <label htmlFor={id} className={classNames("pl-2", "text-primary", "text-body-sm", "peer-hover:text-primary")}>
        {label}
      </label>
    </div>
  );
};
