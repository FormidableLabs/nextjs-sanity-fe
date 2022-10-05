


#### Category PLP page i.e. (`/categories/pastries`)

A Category Product List Page lists all products for a given Category.

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

<!-- TODO: This entire section is dealing with PNPM pitfalls, let's remove it -->

### Aliasing pnpm command

If you find `pnpm` hard to spell and use, you're not alone. Many of us have set up an alias in our dot files `(.**rc)` to get around this. For example, this could go into your `~/.zshrc`, `~/.bashrc`, or whatever dot file you prefer.

Set `pn` as an alias for the `pnpm` command

```
alias pn="pnpm"
```

The first time you add the alias, you need to ensure you re-load the terminal, or source the file. To source, type:

```
source ~/<file you modified>
```

### Sanity Studio + pnpm gotchas

The way Sanity Studio works has issues with monorepos, especially when using `pnpm`. Sanity expects all dependencies to be hoisted. To solve the issue, we added the following to the `.npmrc`:

```
public-hoist-pattern[]=*@sanity/*
```

This hoists all dependencies and sub dependencies to the root node_modules.

Another monorepo gotcha is Sanity cli expects to be run from the root where sanity `node_modules` are located. This is not ideal when using monorepos, to solve this issue all the scripts ran via pnpm have a flag to specify cwd to be the sanity package.
