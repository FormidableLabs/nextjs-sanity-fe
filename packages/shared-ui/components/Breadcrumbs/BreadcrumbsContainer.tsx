import classNames from "classnames";
import React from "react";

type BreadcrumbsContainerProps = React.PropsWithChildren & {
  className?: string;
  separator?: React.ReactNode;
};

/**
 *
 * @param elements  List of link elements
 * @param separator String to be inserted between elements
 * @returns array
 */
const addSeparators = (elements: JSX.Element[], separator: React.ReactNode) => {
  return elements.reduce((acc: JSX.Element[], current: JSX.Element, index: number) => {
    if (index < elements.length - 1) {
      acc = acc.concat(
        current,
        <li className="mx-1" key={`breadcrumb-separator-${index}`} aria-label="hidden">
          {separator}
        </li>
      );
    } else {
      // We don't need a separator for the last element.
      acc.push(current);
    }

    return acc;
  }, []);
};

export const BreadcrumbsContainer = ({ children, separator = "/", className = "" }: BreadcrumbsContainerProps) => {
  const items = React.Children.toArray(children);
  const len = items.length;

  /**
   * Add styles to wrapped elements
   */
  const formattedItems = items.map((item, index) => {
    const isLastElement = Boolean(index == len - 1);
    return (
      <li
        key={`breadcrumb-${index}`}
        className={classNames(
          "border rounded-full text-body-sm py-2",
          {
            "px-4 mx-2 transition-colors duration-150": !isLastElement,
            // Remove styles for last element
            "border-0 px-2": isLastElement,
          },
          className
        )}
      >
        {item}
      </li>
    );
  });

  const itemsWithSeparators = addSeparators(formattedItems, separator);

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-row items-center">{itemsWithSeparators}</ol>
    </nav>
  );
};
