import { Metadata } from "next";

import Link from "next/link";
import { BreadIcon } from "../ui/shared-ui";
import { Breadcrumbs } from "app/components/Breadcrumbs";
import LocalImage from "app/components/LocalImage";
import bigPictureImage from "../../../../docs/img/big-picture.png";
import cacheDiagramImage from "../../../../docs/img/caching-diagram.png";

const DIAGRAM_WIDTH = 700.0;
const DIAGRAM_HEIGHT = DIAGRAM_WIDTH / 1.86;
const FASTLY_WIDTH = 700.0;
const FASTLY_HEIGHT = FASTLY_WIDTH / 2.93;

export const metadata: Metadata = {
  title: "About",
  description: "About the Formidable Boulangerie project.",
};

export default async function Page() {
  return (
    <>
      <div className="container my-4">
        <Breadcrumbs />
      </div>
      <div className="container py-9 grid grid-cols-1 lg:grid-cols-2 gap-9 text-primary">
        <div className="order-1 flex flex-col gap-9 justify-between">
          <h1 className="text-h4 md:text-h2">Learn more about the Formidable Ecommerce demo site</h1>
          <p>
            We don’t really sell bread. The goal of the project is to provide a realistic demonstration of running a
            highly performant and available e-commerce site with data sourced from Sanity’s headless CMS. The app is
            powered by&nbsp;
            <a
              className="hover:underline font-bold"
              href="https://nextjs.org/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Next.js
            </a>
            ,&nbsp;
            <a
              className="hover:underline font-bold"
              href="https://www.sanity.io/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Sanity CMS
            </a>
            , and&nbsp;
            <a
              className="hover:underline font-bold"
              href="https://www.fastly.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Fastly
            </a>
            .
          </p>
        </div>
        <div className="order-2">
          <LocalImage
            alt="big picture diagram"
            src={bigPictureImage}
            width={DIAGRAM_WIDTH}
            height={DIAGRAM_HEIGHT}
            className="rounded-2xl max-w-full w-auto object-contain object-center"
            priority
          />
        </div>
        <div className="order-3 lg:col-span-2 flex flex-col gap-9 justify-between">
          <div>
            <h4 className="text-h4 mb-4">Headless CMS-driven architecture.</h4>
            <p className="mb-4">
              The e-commerce data is stored in a headless CMS (powered by Sanity). The project uses Next.js (deployed on
              Vercel) to render the site, and Fastly is placed in front of Vercel to cache server-rendered webpages for
              speed and availability.
            </p>
            <ul>
              <li className="mb-3 last-of-type:mb-0 flex items-baseline gap-2">
                <div className="top-1 relative">
                  <BreadIcon />
                </div>
                <div>
                  <h1 className="font-medium">Sanity CMS</h1>
                  Sanity is used for storing information about our e-commerce products. The data from Sanity is fetched
                  using&nbsp;
                  <a
                    className="hover:underline font-bold"
                    href="https://www.sanity.io/docs/groq"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    GROQ
                  </a>
                  &nbsp;– a query language, used for fetching data. Formidable built&nbsp;
                  <a
                    className="hover:underline font-bold"
                    href="https://formidable.com/open-source/groqd/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Groqd
                  </a>
                  &nbsp; – a schema-unaware, runtime and type-safe query builder for GROQ.
                </div>
              </li>
              <li className="mb-3 last-of-type:mb-0 flex items-baseline gap-2">
                <div className="top-1 relative">
                  <BreadIcon />
                </div>
                <div>
                  <h1 className="font-medium">Sanity Studio</h1>
                  Sanity Studio is a web interface for Sanity’s headless CMS. It is used for creating and editing the
                  data on the site. The models for Sanity are created in code and tracked in source control. Sanity
                  Studio is integrated into the NextJS application and deployed alongside{" "}
                  <Link href="studio" className="hover:underline font-bold">
                    as a route
                  </Link>
                  .
                </div>
              </li>
              <li className="mb-3 last-of-type:mb-0 flex items-baseline gap-2">
                <div className="top-1 relative">
                  <BreadIcon />
                </div>
                <div>
                  <h1 className="font-medium">NextJS app</h1>
                  To show the CMS data to end-users we created a Next.js web app that server-renders some common
                  e-commerce pages, including a landing page, a Product Listing Page (PLP) with sorting and filtering,
                  and a Product Details Page (PDP). The Next.js app is deployed to{" "}
                  <a
                    className="hover:underline font-bold"
                    href="https://vercel.com"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Vercel
                  </a>
                  &nbsp;via their git pipeline. In a real-world e-commerce app, we expect to experience some heavy loads
                  on pages whose data doesn’t change much between visits, and therefore we can deploy caching strategies
                  to reduce the load on our source server.
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-h4 mb-4">The caching story.</h4>
            <ul>
              <li className="mb-3 last-of-type:mb-0 flex items-baseline gap-2">
                <div className="top-1 relative">
                  <BreadIcon />
                </div>
                <div>
                  <h1 className="font-medium">Fastly CDN and Caching</h1>
                  <p className="mb-4">
                    In order to enhance the speed of the app, we are utilizing Fastly’s CDN with a high cache-lifetime
                    for server-rendered pages. We are using Fastly to both cache and host the subdomain used for this
                    showcase app. The data flow involved in caching is illustrated below:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-9 text-primary">
                    <LocalImage
                      alt="cache diagram"
                      src={cacheDiagramImage}
                      width={FASTLY_WIDTH}
                      height={FASTLY_HEIGHT}
                      className="rounded-2xl max-w-full h-auto object-contain object-center"
                    />
                    <div>
                      <div>
                        To cache our server-rendered pages at the Fastly layer, we use response headers to indicate
                        what/how we want Fastly to cache our responses from the source server. We need to a couple key
                        ingredients:
                        <ul>
                          <li className="my-3 last-of-type:mb-0 flex items-baseline gap-2">
                            <div className="top-1 relative">
                              <BreadIcon />
                            </div>
                            <div>
                              <code>Surrogate-Control</code> response header needs to be added to pages where caching is
                              desired.&nbsp;
                              <a
                                className="hover:underline font-bold"
                                href="https://docs.fastly.com/en/guides/working-with-surrogate-keys"
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                Learn more.
                              </a>
                            </div>
                          </li>
                          <li className="my-3 last-of-type:mb-0 flex items-baseline gap-2">
                            <div className="top-1 relative">
                              <BreadIcon />
                            </div>
                            <div>
                              <code>Surrogate-Key</code> response header needs to be added to enable appropriate cache
                              invalidation.&nbsp;
                              <a
                                className="hover:underline font-bold"
                                href="https://developer.fastly.com/reference/api/purging"
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                Learn more.
                              </a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    On the Next.js side we’ll need to include a few primary response headers to then control caching (in
                    our case, we’re setting these headers from <code>middleware</code> on server-rendered pages that
                    we’d like to cache).
                    <ul>
                      <li className="my-3 last-of-type:mb-0 flex items-baseline gap-2">
                        <div className="top-1 relative">
                          <BreadIcon />
                        </div>
                        <div>
                          <code>surrogate-control</code> Fastly-specific header used to set the cache policies.
                        </div>
                      </li>
                      <li className="my-3 last-of-type:mb-0 flex items-baseline gap-2">
                        <div className="top-1 relative">
                          <BreadIcon />
                        </div>
                        <div>
                          <code>surrogate-key</code> Fastly-specific header that allows purging by key. Note: this
                          header is removed by Fastly before sending the response to the client. To see the value of
                          this header, you must include the&nbsp;
                          <a
                            className="hover:underline font-bold"
                            href="https://developer.fastly.com/reference/http/http-headers/Fastly-Debug/"
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            <code>Fastly-Debug</code>
                          </a>
                          &nbsp;header in your request.
                        </div>
                      </li>
                      <li className="my-3 last-of-type:mb-0 flex items-baseline gap-2">
                        <div className="top-1 relative">
                          <BreadIcon />
                        </div>
                        <div>
                          <code>cache-control</code> used to indicate to browsers and Vercel to not cache so that we can
                          handle caching solely at the Fastly layer.
                        </div>
                      </li>
                    </ul>
                  </div>
                  <p className="mt-4">
                    With these response headers implemented, Fastly will start caching our responses and give us a path
                    to invalidate our cache when necessary. In our case, we use data items’ <code>slug</code>s as part
                    of our <code>surrogate-key</code>&nbsp; header to indicate what items’ data are used to render a
                    page so that we can invalidate accordingly when any of those items’ data changes.
                  </p>
                </div>
              </li>
              <li className="mb-3 last-of-type:mb-0 flex items-baseline gap-2">
                <div className="top-1 relative">
                  <BreadIcon />
                </div>
                <div>
                  <h1 className="font-medium">Cache Invalidation and Purging</h1>
                  When CMS data changes, a Sanity webhook is triggered and makes a request to an API endpoint in our
                  Next.js app. The endpoint does some validation on the request (to make sure it’s coming from a trusted
                  Sanity webhook), and then makes a request to Fastly’s API to invalidate/purge our cache accordingly.
                  The Sanity webhook payload contains information (in our case, an item’s &nbsp;
                  <a
                    className="hover:underline font-bold"
                    href="https://www.sanity.io/docs/slug-type"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <code>slug</code>
                  </a>
                  &nbsp;about what data changes, and our API endpoint uses that <code>slug</code> to tell Fastly which
                  cache data to invalidate (based on the <code>surrogate-key</code> set in the original response
                  header).
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
