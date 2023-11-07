import classNames from "classnames";

import { currencyFormatter } from "../utils/currencyFormatter";

export interface CardProps {
  title: string;
  price?: number;
  Link?: React.ElementType;
  Image?: React.ElementType;
  subTitle?: string;
  to: string;
  className?: string;
  imageContainerClass?: string;
}

export const Card = ({
  to,
  subTitle,
  title,
  price,
  Link = "a",
  className = "",
  imageContainerClass,
  children,
}: React.PropsWithChildren<CardProps>) => {
  return (
    <Link href={to} className={`flex flex-col justify-center text-primary group w-full ${className}`}>
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
    </Link>
  );
};
