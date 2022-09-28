import classNames from "classnames";
import { useSelect } from "downshift";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

interface Option {
  title: string;
  value: string;
}

export interface Props {
  options: Option[];
  label?: string;
  placeholder: string;
  defaultSelectedItem?: Option | null;
  onChange?: (value?: Option | null) => void;
}

const itemToString = (item: Option | null) => (item ? item.title : "");

export function Select({ label, placeholder, options, defaultSelectedItem, onChange }: Props) {
  const [selectedItem, setSelectedItem] = useState<Option | null | undefined>(defaultSelectedItem);

  // This is needed if you change route so that it updates the currently selected dropdown
  useEffect(() => {
    if (defaultSelectedItem) {
      setSelectedItem(defaultSelectedItem);
    }
  }, [defaultSelectedItem]);

  const { isOpen, getToggleButtonProps, getLabelProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({
    items: options,
    itemToString,
    selectedItem,
    onSelectedItemChange({ selectedItem }) {
      setSelectedItem(selectedItem);
      onChange && onChange(selectedItem);
    },
  });

  return (
    <div>
      <div className="w-72 flex flex-col gap-1">
        {label && (
          <label className="text-body-reg text-blue mb-2" {...getLabelProps()}>
            {label}
          </label>
        )}
        <button
          aria-label="toggle menu"
          className="px-4 py-2 border border-blue text-blue rounded-lg hover:bg-blue/20 flex justify-between"
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
          "absolute",
          "w-72",
          "mt-4",
          "shadow-md",
          "max-h-80",
          "border",
          "border-blue",
          "rounded",
          "overflow-auto",
          "bg-yellow",
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
                "text-blue",
                "cursor-pointer",
                highlightedIndex === index && "bg-blue text-yellow",
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
