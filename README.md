# Formidable - NextJS Sanity E-Commerce Site

<todo we should really start with something more engaging than immediately mentioning pnpm>

This repo is a mono repo built using [pnpm](https://pnpm.io/) workspaces. It consists of two deployable applications.

1. NextJs App (deployed to Vercel)
2. Sanity Studio (deployed to Sanity)

A manually created Fastly CDN is used for the demo project to facilitate caching of SSR pages.

![Architecture](https://user-images.githubusercontent.com/3632381/190230431-bf530eeb-9926-4c43-8a39-a7f7f882276e.png)

The deployed Nextjs demo site can be found at https://nextjs-sanity.formidable.dev

## Getting Started

If you want to run the repo locally, you will need to clone it. Feel free to fork the project if you'd like to make updates, or a Pull Request if you have improvements you'd like to add.

If you don't want to bother with local setup, feel free to visit the demo site (https://nextjs-sanity.formidable.dev).

If you do want to run this locally, there are a few different paths you can take

1. Run the Nextjs site locally and use our sanity project (easy)
2. Run the Nextjs site locally and use your own sanity project (medium)

We will start with the Nextjs setup:

### Install pnpm

This project uses pnpm v7 for dependency management. Installation instructions can be found [here](https://pnpm.io/installation).

### Installing dependencies

Once pnpm is installed, run the following command to install dependencies

```bash
pnpm install
```

### Getting a Sanity ProjectId

Sanity CMS is the backend of the project, and without a Sanity project id nothing will work. You can either use ours, or set up your own.

#### Using the Formidable Boulangerie Sanity Project

If you would like to use Formidable's Sanity project (`5bsv02jj`), setup is quite simple. If you use the Formidable project, you will not have access to sign in to Sanity Studio. If you want to play around in Sanity Studio, you will need to create your own project as outlined in the "Using your own Sanity Project" Section.

Create a `.env` file under `./packages/nextjs` and place the environment variable into it:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=5bsv02jj
```

Assuming you completed the previous steps, you should now be able to start the Nextjs app using:

```
pnpm dev:nextjs
```

That should've started a dev server running at `http:localhost:3000`. Go ahead and load it in the browser to ensure it works. If you only wanted to get the Nextjs app working, you're done! If you want to setup your _own_ Sanity project, proceed further.

#### Using your own Sanity Project

If you want to run the project _using your own Sanity project_, you will need to create a Sanity account. That project Id will be needed in the next section. If you'd rather use the deployed demo site, go [here](https://nextjs-sanity.formidable.dev).

We can use the sanity cli to initialize the Sanity project (this is just running `sanity init` behind the scenes):

```
pnpm init-sanity
```

This will require you to login to Sanity. We recommend using the following choices in the prompts:

```
The current folder contains a configured Sanity studio. Would you like to reconfigure it? Yes
Select project to use: **Create new project**
Your project name: <whatever you want>
Select organization to attach project to: **None**
Use the default dataset configuration? **Yes**
```

Sanity cli will detect the project files in the repository and deploy automatically. Once Sanity has completed initialization, we need to use the newly created project id and place that in our `.env` file. To do this, go to the `sanity.json` file and grab the `projectId` (Sanity cli should have modified the value automatically). Put the new projectId into your `.env` file.

You should now be able to run `pnpm local` which will:

nextjs on `http://localhost:3000`
sanity studio on `http://localhost:3333/desk`

If you load up sanity studio, you will notice the schema is there, but there's no data. No worries, we've got a script which can add the same data we run on the Formidable Bread site!

#### Seed Sanity project with data

The final task is to seed the project with some data. To do that, run the following command to add all of our great Formidable Bread content :loaf: :bread: :

```
pnpm seed-sanity
```

This command is importing Formidable's dataset (stored in `production.tar.gz` file) into your project. Once complete, you should see output similar to this:

```
Done! Imported 43 documents to dataset "production"
```

Now, if you reload Sanity Studio you should see content populated. Additionally, you can now refresh the nextjs application to see some of that tasty bread!

## Environment Variables

There is an `./packages/nextjs/.env.sample` committed to the repo which contains the list of env variables for the project. For running Nextjs and Sanity Studio locally, only the `NEXT_PUBLIC_SANITY_PROJECT_ID` variable is needed. The other values in the sample file are only needed if you intend to test the purging scenarios on your local machine. I.e. the `/api/webhook` route.

### Scripts

:bulb: To get a list of scripts available, you can run `pnpm run` or `yarn run` and it will output a list of available commands.

- `local` - Runs Sanity Studio, NextJs app and GraphQL codegen watch in parallel

- `dev:nextjs` - Runs NextJs app and GraphQL codegen

- `build:nextjs` - Builds NextJS app

- `start:nextjs` - Starts the built out NextJs app

- `codegen:nextjs` - Runs GraphQL codegen in Nextjs App

- `dev:sanity` - Runs Sanity Studio locally

- `build:sanity` - Builds Sanity Studio

- `deploy-sanity-studio` - Deploys Sanity Studio to Sanity

- `deploy-sanity-graphql` - Deploys GraphQL schema to Sanity

## NextJS App

The Nextjs Application is intended to demonstrate the use of Sanity headless CMS to create an e-commerce site. The goal of this site is to provide a real world example on running a highly scalable e-commerce site.

### CMS - Sanity

Sanity is used for storing information about products. The data from Sanity is fetched via two ways:

1. _GraphQL_ - is used for fetching data when no filtering is required. The reason being GraphQL does not support filtering on custom fields other than name, description and slug.

2. [Groq](https://www.sanity.io/docs/groq) - is used for fetching data when filtering is required, it supports filtering on fields in the model.

The site is deployed to [Vercel](https://nextjs-sanity-fe.vercel.app/) built out using server-side rendering.

## Sanity Studio

Sanity Studio is a web interface for Sanity. It is used for creating and editing the data on the site. The models for Sanity are created in code and tracked in source control. The models can be found at `packages/sanity/schemas`. Sanity studio is deployed to Sanity [here](https://nextjs-ecom.sanity.studio/).

If you want to look at the Studio site, you will need to go through the steps of creating your own Sanity account and project. Instructions for that are in the Getting Started section above.

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
- **Filter**: currently set to `_type in ["category", "categoryImage", "product", "productImage", "size", "variant"]`.
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

![Process Diagram](https://user-images.githubusercontent.com/3632381/192895638-85574a1e-bb59-44dd-b897-a68c6dcc3db1.png)

#### Category PLP page i.e. (`/categories/tops`)

A Category PLP page lists all products for a given Category.

When a product is created, updated, or deleted, we should purge the associated category page.

#### Home Page i.e. (`/`)

The Home Page is enriched with data from multiple sources. Specifically, it displays the top products and categories within the site.

When a Category or Product is created, updated, or deleted, a purge should be executed for the appropriate surrogate-key.

#### Category Listing Page i.e. `/categories`

The Home and Categories Pages list Categories set up in Sanity, and therefore should be kept up to date when Categories change.

When a Category is created, updated, or deleted, a purge should be executed using the `category` surrogate-key.

#### PDP page i.e. (`/products/croissant`)

A PDP page lists metadata about a specific product.

When a product is created, updated, or deleted, we should purge that specific page.

Specific situation:

In Sanity, the product with a slug of `croissant` had it's metadata modified (name, description, etc).

When that payload is received, a purge request should be done for the following surrogate-key `croissant`

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

Once you have the app open in Chrome. Open Dev tools. View the "Doc" network request. Under response headers you should see something similar to this (sample from a product page):

```
surrogate-control: max-age=604800, stale-while-revalidate=120000, stale-if-error=600000
surrogate-key: product_croissant productImage variant
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
  _type: 'product',
  slug: 'croissant'
}
initiating cache purge for product product_croissant
cache purge successfully requested {
  product: '7100059-1662806213-2227868',
  'product_croissant': '7100059-1662806213-2227869'
}
```

## Appendix

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

### Sanity Studio + pnpm gotchas

The way Sanity Studio works has issues with monorepos, especially when using pnpm. Sanity expects all dependencies to be hoisted. To solve the issue, we added the following to the `.npmrc`:

```
public-hoist-pattern[]=*@sanity/*
```

This hoists all dependencies and sub dependencies to the root node_modules.

Another monorepo gotcha is Sanity cli expects to be run from the root where sanity `node_modules` are located. This is not ideal when using monorepos, to solve this issue all the scripts ran via pnpm have a flag to specify cwd to be the sanity package.
