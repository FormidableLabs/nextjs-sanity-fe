import * as React from "react";
import Head from "next/head";

type PageHeadProps = { title: string; description: string };

export const PageHead = ({ title, description: rawDescription }: PageHeadProps) => {
  const description = `${rawDescription} By Formidable.`;
  return (
    <Head>
      <title>{title} – Formidable Boulangerie</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="description" property="og:description" content={description} />
    </Head>
  );
};
