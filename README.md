# Formidable - NextJS Sanity E-Commerce Site

This repo is a mono repo built using [pnpm](https://pnpm.io/) workspaces. It consists of two packages:

1. NextJs App
2. Sanity Studio

## Getting Started

This project uses pnpm for dependency management. Make sure you have v7 of pnpm installed, instructions can be found [here](https://pnpm.io/installation) if you don't already have it installed.

```bash
pnpm install
```

### Scripts

- `local` - Runs Sanity Studio, NextJs app and GraphQL codegen watch in parallel.

- `dev:nextjs` - Runs NextJs app and GraphQL codegen.

- `build:nextjs` - Builds NextJS app

- `start:nextjs` - Starts built out NextJs app.

- `codegen:nextjs` - Runs GraphQL codegen in Nextjs App.

- `dev:sanity` - Runs Sanity Studio locally

- `build:sanity` - Builds Sanity Studio

- `deploy-sanity-studio` - Deploys Sanity Studio to Sanity

- `deploy-sanity-graphql` - Deploys GraphQL schema to Sanity

## NextJS App

The NextJs App is demonstrating the use of Sanity headless CMS to create a e-commerce site. The goal of this site is to provide a real world example on running a highly scalable e-commerce site.

### CMS - Sanity

Sanity is used for storing information about products. The data from Sanity is fetched via two ways:

1. _GraphQL_ - is used for fetching data when no filtering is required. The reason being GraphQL does not support filtering on custom fields other than name, description and slug.

2. [Groq](https://www.sanity.io/docs/groq) - is used for fetching data when filtering is required, it supports filtering on fields in the model.

The site is deployed to [Vercel](https://nextjs-sanity-fe.vercel.app/) built out using server-side rendering.

## Sanity Studio

Sanity Studio is a web interface for Sanity. It is used for creating and editing the data on the site. The models for Sanity are created in code and tracked in source control. The models can be found at `packages/sanity/schemas`. Sanity studio is deployed to Sanity's hosting located [here](https://nextjs-ecom.sanity.studio/). 
You do need access to Sanity Studio to modify this site.  Please reach out to the Core Tech team to request access (#core-tech-discussion in Slack).

### Sanity Studio + pnpm gotchas

The way Sanity Studio works has issues with monorepos, especially when using pnpm. Sanity expects all dependencies to be hoisted. To solve the issue, we added the following to the `.npmrc`:

```
public-hoist-pattern[]=*@sanity/*
```

This hoists all dependencies and sub dependencies to the root node_modules.

Another monorepo gotcha is Sanity cli expects to be run from the root where sanity `node_modules` are located. This is not ideal when using monorepos, to solve this issue all the scripts ran via pnpm have a flag to specify cwd to be the sanity package.

### Sanity Webhooks

Webhooks are an important part of this project. In order to serve accurate data and cache it for long periods of time, there must be notifications when content changes occur. Luckily, sanity has excellent support for [webhooks](https://www.sanity.io/docs/webhooks).

Webhook(s) are utilized as the change detection mechanism. Our current cache strategy is based around using the `surrogate-key` header with the value of the `slug` for that content item.

[Slugs](https://www.sanity.io/docs/slug-type) are an important part of our caching strategy. Sanity defines them as:

> A slug is a unique string (typically a normalized version of title or other representative string), often used as part of a URL. The input form will render an error message if the current slug field is not unique (see note on uniqueness below).

Since most all content has a slug, it's very easy to use that slug for caching purposes. When a webhook is triggered, we essentially only need to know the Sanity Type and the Slug, in order to perform a cache purge for the relevant content.

## Fastly Caching

In order to enhance the speed of the app, we are utilizing SSR caching within fastly paired with surrogate-keys for specific purging scenarios.

If the Vercel url is used directly, there will be no caching setup. In order to utilize the caching, you will need to use the fastly url.

It is currently hosted using Fastly's Free TLS option under `https://nextjs-sanity.global.ssl.fastly.net/`. In the future, we will assign an actual domain to the project.

Surrogate Key reference:
https://docs.fastly.com/en/guides/working-with-surrogate-keys

Purging api reference:
https://developer.fastly.com/reference/api/purging/

todo

- [x] add category specific surrogate key
- [x] add product specific surrogate key
- [ ] add webhook configuration to sanity
- [ ] create webhook api key and store in 1pass / GH
- [ ] add webhook api key as an environment variables
- [ ] add webhook listener to project which will purge when cached content is updated
- [ ] update Fastly domain to use custom domain (`https://nextjs-sanity.formidable.dev`)

### Important headers

These are the primary response headers used to control caching. They are set within `getServerSideProps` on a per-page level.

- `surrogate-control` - Fastly specific header used to set the cache policies. (`max-age`, `stale-while-revalidate`, `stale-while-error`).
- `surrogate-key` - Fastly specific header that allows purging by key. Note: this header is removed by fastly before responding. To see the value of this header, you must include the `Fastly-Debug` header in your request.
- `cache-control` - This header is used to indicate to browsers and Vercel to not cache.

The following request headers can also be useful.

- `Fastly-Debug` - [Fastly Debug reference](https://developer.fastly.com/reference/http/http-headers/Fastly-Debug/). Helpful for checking on

### Purging scenarios

These are the purging scenarios we will be adding support for in the near future.

#### Home Page / Category Listing Page i.e. (`/` or `/categories`)

The Home and Categories Pages list the Top Categories, and therefore should be kept up to date when specific Categories change.

When a Category is created, updated, or deleted, we can purge this page by using the `category` surrogate-key.

#### Category PLP page i.e. (`/categories/tops`)

A Category PLP page lists all products for a given Category.

When a product is created, updated, or deleted, we should purge the associated category page.

#### PDP page i.e. (`/products/blank-t-shirt`)

A PDP page lists metadata about a specific product.

When a product is created, updated, or deleted, we should purge that specific page.

Specific situation:

In Sanity, the product with a slug of `blank-t-shirt` had it's metadata modified (name, description, etc).

This should trigger a webhook with the following metadata:

```
# TODO fill this out with webhook sample
```

When that payload is received, a purge request should be done for the following surrogate-key `blank-t-shirt`
