import React from "react";
import { useRouter } from "next/router";
import { MdOutlineHome } from "react-icons/md";
import { capitalizeWords } from "utils/capitalizeWords";
import { BreadcrumbsContainer } from "./BreadcrumbsContainer";
import { BreadcrumbItem } from "./BreadcrumbItem";

type BreadcrumbsProps = React.PropsWithChildren & {
  separator?: string;
};

type LinkElement = {
  title: string;
  href: string;
};

export const Breadcrumbs = ({ separator = "/" }: BreadcrumbsProps) => {
  const { query, asPath } = useRouter();
  // Remove query string.
  const urlPath = asPath.split("?")[0];

  // Normal route.
  let pathElements = urlPath.split("/");

  /**
   * Category detected.
   */
  if (query?.category && query.category.length > 0) {
    pathElements = ["categories", query.category.toString()];
  }

  /**
   * Variant detected.
   */
  if (query?.variant && query.variant.length > 0 && query.variant !== pathElements[pathElements.length - 1]) {
    // Add the variant name instead of the product name.
    pathElements = [...pathElements, query.variant.toString()];
  }

  /**
   * generates a formatted title and href for each path element.
   */
  const elements = pathElements.reduce((acc: LinkElement[], current: string, index: number) => {
    if (current.length < 1) return acc;

    acc.push({
      title: capitalizeWords(current),
      href: pathElements.slice(0, index + 1).join("/"),
    });

    return acc;
  }, []);

  return (
    <BreadcrumbsContainer aria-label="breadcrumb" separator={separator}>
      <BreadcrumbItem href="/">
        <MdOutlineHome className="mr-2" /> Home
      </BreadcrumbItem>
      {elements.map(({ title, href }, index) => (
        <BreadcrumbItem key={`${href}-${index}`} href={`${href}`} isLast={index == elements.length - 1}>
          {title}
        </BreadcrumbItem>
      ))}
    </BreadcrumbsContainer>
  );
};