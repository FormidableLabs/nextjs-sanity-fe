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
