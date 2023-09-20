# Setup Guide

This repo is a mono repo built using [pnpm](https://pnpm.io/) workspaces. It consists of two deployable applications.

1. Next.js app (deployed to Vercel)
2. Sanity Studio (deployed to Sanity)

A manually created Fastly CDN is used for the demo project to facilitate caching of SSR pages.

The deployed Next.js demo site can be found at https://nextjs-sanity.formidable.dev

## Getting Started

If you want to run the repo locally, you will need to clone it. Feel free to fork the project if you'd like to make updates, and create a Pull Request if you have improvements you'd like to add.

If you don't want to bother with local setup, feel free to visit the demo site (https://nextjs-sanity.formidable.dev).

If you do want to run this locally, there are a few different paths you can take:

1. Run the Next.js site locally and use our Sanity project (easy);
2. Run the Next.js site locally and use your own Sanity project (medium).

We will start with the Next.js setup:

### Install pnpm

This project uses pnpm v7 for dependency management. Installation instructions can be found [here](https://pnpm.io/installation).

### Installing dependencies

Once `pnpm` is installed, run the following command to install dependencies

```bash
pnpm install
```

### Getting a Sanity Project ID

Sanity CMS is the backend of the project, and without a Sanity project id nothing will work. You can either use ours, or set up your own.

#### Using the "Formidable Boulangerie" Sanity Project

If you would like to use Formidable's Sanity project (`5bsv02jj`), setup is quite simple. If you use the Formidable project, you will not have access to sign in to Sanity Studio. If you want to play around in Sanity Studio, you will need to create your own project as outlined in the "Using your own Sanity Project" Section.

Create a `.env` file under `./packages/nextjs` or rename `.env.sample` to `.env` and place the environment variable into it:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=5bsv02jj
```

Make sure the environment variable is loaded by running `env` command in your terminal

If it is not loaded you can do so by running `source .env` command in your terminal

Assuming you completed the previous steps, you should now be able to start the Next.js app using:

```
pnpm dev:nextjs
```

That will start a dev server running at `http:localhost:3000`. Open in your browser to ensure it works. If you only want to get the Next.js app working, you're done! If you want to setup your _own_ Sanity project, proceed further.

#### Using your own Sanity Project

If you want to run the project _using your own Sanity project_, you will need to create a Sanity account. That project Id will be needed in the next section.

We can use the Sanity cli to initialize the Sanity project (this is just running `sanity init` behind the scenes):

```
pnpm init-sanity
```

This will require you to log in to Sanity. We recommend using the following choices in the prompts:

```
The current folder contains a configured Sanity studio. Would you like to reconfigure it? Yes
Select project to use: **Create new project**
Your project name: <whatever you want>
Select organization to attach project to: **None**
Use the default dataset configuration? **Yes**
```

Sanity cli will detect the project files in the repository and deploy automatically. Once Sanity has completed initialization, we need to use the newly created project id and place that in our `.env` file. To do this, go to the `sanity.json` file and grab the `projectId` (Sanity cli should have modified the value automatically). Put the new projectId into your `.env` file.

You should now be able to run `pnpm local` which will run:

- Next.js on `http://localhost:3000`
- Sanity Studio on `http://localhost:3333/desk`

If you load up Sanity Studio, you will notice the schema is there, but there's no data. No worries, we have a script which can add the same data we run on the Formidable Bread site!

#### Seed Sanity project with data

The final task is to seed the project with some data. To do that, run the following command to add all of our great Formidable Bread content :bread: :

```
pnpm seed-sanity
```

This command is importing Formidable's dataset (stored in `production.tar.gz` file) into your project. Once complete, you should see output similar to this:

```
Done! Imported 43 documents to dataset "production"
```

Now, if you reload Sanity Studio you should see content populated. Additionally, you can now refresh the Next.js application to see some of that tasty bread!

## Environment Variables

There is an `./packages/nextjs/.env.sample` committed to the repo which contains the list of env variables for the project. For running Next.js and Sanity Studio locally, only the `NEXT_PUBLIC_SANITY_PROJECT_ID` variable is needed. The other values in the sample file are only needed if you intend to test the purging scenarios on your local machine. I.e. the `/api/webhook` route.

### Scripts

:bulb: To get a list of scripts available, you can run `pnpm run` and it will output a list of available commands.

- `dev:nextjs` - Runs the Next.js app
- `build:nextjs` - Builds the Next.js app
- `start:nextjs` - Starts the built-out Next.js app
