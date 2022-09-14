# Formidable - NextJS Sanity E-Commerce Site

This repo is a mono repo built using [pnpm](https://pnpm.io/) workspaces. It consists of two deployable applications.

1. NextJs App (deployed to Vercel)
2. Sanity Studio (deployed to Sanity)

A manually created and managed Fastly CDN service is used to facilitate caching.

![Architecture](https://user-images.githubusercontent.com/3632381/190230431-bf530eeb-9926-4c43-8a39-a7f7f882276e.png)

## Getting Started

This project uses pnpm for dependency management. Make sure you have v7 of pnpm installed, instructions can be found [here](https://pnpm.io/installation) if you don't already have it installed.

```bash
pnpm install
```

### Aliasing pnpm command

If you find 'pnpm' hard to spell and use, you're not alone. Many of us have set up an alias in our dot files `(.**rc)` to get around this. For example, this could go into your `.zshrc`, `.bashrc`, or whatever dot file you prefer.

This is the syntax:

```
alias alias_name="command_to_run"
```

Sets `pn` as an alias for the `pnpm` command

```
alias pn="pnpm"
```

The first time you add the alias, you need to ensure you re-load the terminal, or source the file. To source, type:

```
source ~/<file you modified>
```

## Environment Variables

There is an `.env.sample` committed to the repo which contains the list of env variables for the project. The redacted values can be found in 1Password IC Vault. The secrets are only needed for specific use case and not needed for just running the NextJS application.

The following command copies `.env.sample` into a file named `.env`

```bash
cp .env.sample .env
```

### Scripts

:bulb: To get a list of scripts available, you can also run `pnpm run` or `yarn run` and it will output a list of available commands.

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
You do need access to Sanity Studio to modify this site. Please reach out to the Core Tech team to request access (#core-tech-discussion in Slack).

### Sanity Studio + pnpm gotchas

The way Sanity Studio works has issues with monorepos, especially when using pnpm. Sanity expects all dependencies to be hoisted. To solve the issue, we added the following to the `.npmrc`:

```
public-hoist-pattern[]=*@sanity/*
```

This hoists all dependencies and sub dependencies to the root node_modules.

Another monorepo gotcha is Sanity cli expects to be run from the root where sanity `node_modules` are located. This is not ideal when using monorepos, to solve this issue all the scripts ran via pnpm have a flag to specify cwd to be the sanity package.

### Sanity Webhooks

Webhooks are an important part of this project. In order to serve accurate data and cache it for long periods of time, there must be notifications when content changes occur. Luckily, sanity has excellent support for [webhooks](https://www.sanity.io/docs/webhooks).

Webhook(s) are utilized as the change detection mechanism. Our current cache strategy is based around using the Fastly `surrogate-key` header with the value of the `slug` for that content item.

[Slugs](https://www.sanity.io/docs/slug-type) are an important part of our caching strategy. Sanity defines them as:

> A slug is a unique string (typically a normalized version of title or other representative string), often used as part of a URL. The input form will render an error message if the current slug field is not unique (see note on uniqueness below).

Since most all content has a slug, it's very easy to use that slug for caching purposes. When a webhook is triggered, we essentially only need to know the Sanity Type and the Slug, in order to perform a cache purge for the relevant content.

The relevant webhook configuration is as follows:

- **URL**: points to our `<host url>/api/webhook` route in the nextjs project
- **Dataset**: set to `*` (since we only have a single dataset)
- **Trigger on**: create, update & delete
- **Filter**: currently set to `_type in ["blog", "category", "categoryImage", "product", "productImage", "size", "variant"]`. Since this is all sanity types, we could also just remove the filter if we wanted.
- **Status**: enabled
- **Http method**: POST
- **Secret**: we have a secret setup, so we can authenticate the webhook requests to ensure they're came from sanity.

## Fastly Caching

We are using Fastly to cache and host the subdomain used for this app. The data flow involved in caching is illustrated below.

![Caching Flow](https://user-images.githubusercontent.com/3632381/190230067-7bfa2559-6067-4ae6-b1e0-fabca62ab96b.png)

NOTE: If the [Vercel url](https://nextjs-sanity-fe.vercel.app/) is used directly, there will be no caching. In order to utilize caching, the fastly url should be used at `https://nextjs-sanity.formidable.dev`.

In order to enhance the speed of the app, we are utilizing a cdn with a high cache-lifetime for Server Side Rendered (SSR) pages. The caveat to this approach is that it is important to invalidate the cache when something changes. Otherwise, it will be displaying incorrect data for a length of time equal to the cache policy.

The Fastly caching piece requires a couple of things:

1. Surrogate-Control Response header needs to be added to pages where caching is desired
2. Surrogate-Key Response header needs to be added to make cache invalidation easier

[Surrogate Key reference](https://docs.fastly.com/en/guides/working-with-surrogate-keys)

[Purging api reference](https://developer.fastly.com/reference/api/purging/)

### Important headers

These are the primary response headers used to control caching. They are set within `getServerSideProps` on a per-page level.

- `surrogate-control` - Fastly specific header used to set the cache policies. (`max-age`, `stale-while-revalidate`, `stale-while-error`).
- `surrogate-key` - Fastly specific header that allows purging by key. Note: this header is removed by fastly before responding. To see the value of this header, you must include the `Fastly-Debug` header in your request.
- `cache-control` - This header is used to indicate to browsers and Vercel to not cache.

The following request headers can also be useful.

- `Fastly-Debug` - [Fastly Debug reference](https://developer.fastly.com/reference/http/http-headers/Fastly-Debug/). Helpful for checking on

### Purging scenarios

There are two main categories for which purging is necessary.

1. Deployments of new code - Vercel automatically purges on deployment. Todo: purge fastly cache on deployment.
2. Content modifications in Sanity Studio

The following simplified process diagram illustrates what conditions are checked when content is modified.

![Process Diagram](https://user-images.githubusercontent.com/3632381/190230732-0bd2ff41-eadf-4816-92b0-6968363b0ee0.png)

#### Blog Page i.e. (`/blogs` or `/blogs/white-tees-are-in`)

This is the simplest purging scenario. Since blogs are only shown under /blogs, we can purge them specifically by id.

When a blog is created, updated, or deleted, we should purge the associated blog page as well as the blog listing page.

#### Category PLP page i.e. (`/categories/tops`)

A Category PLP page lists all products for a given Category.

When a product is created, updated, or deleted, we should purge the associated category page.

#### Home Page i.e. (`/`)

The Home Page is enriched with data from multiple sources. Specifically, it displays the top products and categories within the site.

When a Category or Product is created, updated, or deleted, a purge should be executed for the appropriate surrogate-key.

#### Category Listing Page i.e. `/categories`

The Home and Categories Pages list Categories set up in Sanity, and therefore should be kept up to date when Categories change.

When a Category is created, updated, or deleted, a purge should be executed using the `category` surrogate-key.

#### PDP page i.e. (`/products/blank-t-shirt`)

A PDP page lists metadata about a specific product.

When a product is created, updated, or deleted, we should purge that specific page.

Specific situation:

In Sanity, the product with a slug of `blank-t-shirt` had it's metadata modified (name, description, etc).

When that payload is received, a purge request should be done for the following surrogate-key `blank-t-shirt`

### Troubleshooting purging

If you want to test or troubleshoot purging, here are some tips:

#### Check sanity webhook is enabled

Seems obvious, but it's always possible someone disabled the webhook. If the webhook is disabled, content will NEVER be purged and will only be evicted from the cache upon expiration.

To verify the sanity webhook is enabled, go to the management dashboard, api tab, and verify the webhook is listed as enabled.

#### Check sanity webhook attempts log

Sanity records each time a webhook payload is sent. Reviewing the attempt log can help identify potential problems.

Open the management dashboard, click the hamburger menu and choose "Show attempt log". This will show you recent attempts, and their status code:

```json
[
  {
    "id": "atm-2E5Gv4d1z6Y9pDuNnAQiG8Vl3Nj",
    "projectId": "5bsv02jj",
    "inProgress": false,
    "duration": 121,
    "createdAt": "2022-08-30T16:50:58.275Z",
    "updatedAt": "2022-08-30T16:50:58.275Z",
    "messageId": "msg-2E5Gv24WTt2RlJzkpe6SKg16XWj",
    "hookId": "FcBSPrGqthz8Yaas",
    "isFailure": false,
    "failureReason": null,
    "resultCode": 200,
    "resultBody": "{\"message\":\"Webhook processed successfully\"}"
  }
]
```

#### Check Headers

If the `surrogate-control` or `surrogate-keys` response headers aren't set correctly, that could also cause problems. By default, Fastly strips away the `surrogate-key` header, which makes it harder to know what the keys are. The easiest ways to view the keys are:

1. Load the [vercel app](https://nextjs-sanity-fe.vercel.app/) in chrome.
2. Run the app locally and open in chrome.

Once you have the app open in Chrome. Open Dev tools. View the "Doc" network request. Under response headers you should see something similar to this (sample from a blog page):

```
surrogate-control: max-age=604800, stale-while-revalidate=120000, stale-if-error=600000
surrogate-key: blog_limited-release-of-white-tees
```

#### Check api/webhook logs

If webhooks appear to be getting triggered, but a purge isn't working, you can view real-time logs within vercel. Keep in mind we don't currently have any log storage setup for Vercel, so you can only live stream the logs to get the information you need.

To open the logs, go to the vercel dashboard and find the nextjs-sanity-fe project. Go to the production deployment, click functions, for path choose `api/webhook` to filter out noise from other endpoints. Now, you can edit a sanity item to trigger the webhook and you should get some logging information which can let you know if there's a problem. Example log output below:

```
received a potential webhook request
authorization step has passed
parsed body:
{
  _id: '38b0346a-5106-4bed-a010-a306035c6d5a',
  _type: 'blog',
  slug: 'limited-release-of-white-tees'
}
initiating cache purge for blog blog_limited-release-of-white-tees
cache purge successfully requested {
  blog: '7100059-1662806213-2227868',
  'blog_limited-release-of-white-tees': '7100059-1662806213-2227869'
}
```
