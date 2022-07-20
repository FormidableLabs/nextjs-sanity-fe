# Formidable - NextJS Sanity E-Commerce Site

## CMS

This is a demo site utilizing Sanity CMS and NextJs to showcase an e-commerce site. The site is hosted on [Vercel](https://nextjs-sanity-fe.vercel.app/) built out using SSG.

The CMS repo can be found [here](https://github.com/FormidableLabs/nextjs-sanity-ecom) and the site is [here](https://nextjs-ecom.sanity.studio/).

### Sanity API

Sanity data is fetched via two ways:

1. _GraphQL_ - is used for fetching data when no filtering is required. The reason being GraphQL does not support filtering.

2. [Groq](https://www.sanity.io/docs/groq) - is used for fetching data when filtering is required, it supports filtering on fields in the model.

## Getting Started

This project uses yarn v1 for dependency management. Install depenedencies using the following command:

```bash
yarn
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
