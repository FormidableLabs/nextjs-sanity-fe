import classNames from "classnames";

import { currencyFormatter } from "../../utils/currencyFormatter";
import { PolymorphicComponentProps } from "../../utils/polymorphicComponent";

export interface BaseProps {
  title: string;
  price?: number;
  Image?: React.ElementType;
  subTitle?: string;
  imageContainerClass?: string;
}

type CardProps<AsComponent extends React.ElementType> = PolymorphicComponentProps<AsComponent, BaseProps>;

export const Card = <T extends React.ElementType>({
  subTitle,
  title,
  price,
  as,
  imageContainerClass,
  children,
  ...linkProps
}: React.PropsWithChildren<CardProps<T>>) => {
  const RenderedLink = as || "a";

  return (
    <RenderedLink
      {...linkProps}
      className={`flex flex-col justify-center text-primary group w-full ${linkProps.className}`}
    >
      <span
        className={classNames(
          "rounded-xl group-hover:shadow-lg transition-shadow duration-150 overflow-hidden relative",
          imageContainerClass
        )}
      >
        {children}
      </span>
      <h2 className="text-h5 font-medium mt-4 mb-1">{title}</h2>
      {price && <span className="text-eyebrow font-bold">{currencyFormatter.format(price)}</span>}
      {subTitle && <span className="text-eyebrow">{subTitle}</span>}
    </RenderedLink>
  );
};
