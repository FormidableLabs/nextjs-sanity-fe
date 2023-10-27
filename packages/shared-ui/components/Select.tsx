import classNames from "classnames";
import { useSelect } from "downshift";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

interface Option {
  title: string;
  value: string;
}

export interface Props {
  options: Option[];
  label?: string;
  placeholder: string;
  selectedItem?: Option | null;
  className?: string;
  onChange?: (value?: Option | null) => void;
}

const itemToString = (item: Option | null) => (item ? item.title : "");

export function Select({ label, placeholder, options, className, selectedItem, onChange }: Props) {
  const { isOpen, getToggleButtonProps, getLabelProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({
    items: options,
    itemToString,
    selectedItem,
    onSelectedItemChange({ selectedItem }) {
      onChange && onChange(selectedItem);
    },
  });

  return (
    <div>
      <div className={classNames("w-72 flex flex-col gap-1", className)}>
        {label && (
          <label className="text-body-reg text-primary mb-2" {...getLabelProps()}>
            {label}
          </label>
        )}
        <button
          aria-label="toggle menu"
          className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/20 flex justify-between"
          type="button"
          {...getToggleButtonProps()}
        >
          <span>{selectedItem ? selectedItem.title : placeholder}</span>
          <span>{isOpen ? <MdOutlineKeyboardArrowUp size={20} /> : <MdOutlineKeyboardArrowDown size={20} />}</span>
        </button>
      </div>
      <ul
        {...getMenuProps()}
        className={classNames(
          "absolute z-10",
          "w-72",
          "mt-4",
          "shadow-md",
          "max-h-80",
          "border",
          "border-primary",
          "rounded",
          "overflow-auto",
          "bg-secondary",
          {
            hidden: !isOpen,
          }
        )}
      >
        {isOpen &&
          options.map((item, index) => (
            <li
              className={classNames(
                "first:pt-2",
                "pb-2",
                "pt-3",
                "px-4",
                "flex",
                "flex-col",
                "text-primary",
                "cursor-pointer",
                highlightedIndex === index && "bg-primary text-secondary",
                selectedItem?.value === item.value && "font-bold"
              )}
              key={`${item.value}${index}`}
              {...getItemProps({ item, index })}
            >
              <span>{item.title}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
