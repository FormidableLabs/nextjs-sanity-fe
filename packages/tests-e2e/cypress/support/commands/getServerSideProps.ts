import type * as home from " ../../../../nextjs/pages/index";
import type * as categories from " ../../../../nextjs/pages/categories";
import type * as products from " ../../../../nextjs/pages/products/index";
import type * as product from " ../../../../nextjs/pages/products/[slug]";
import { satisfies } from "../../../../nextjs/utils/satisfies";
import { SSRData } from "../../../../nextjs/utils/typedUrqlState";

type AsyncReturnType<TFunc extends (...args: any) => any> = UnwrapPromise<ReturnType<TFunc>>;
type UnwrapPromise<TPromiseMaybe> = TPromiseMaybe extends Promise<infer TValue> ? TValue : TPromiseMaybe;

type PageProps = {
  "/home": AsyncReturnType<typeof home.getServerSideProps>["props"];
  "/categories": AsyncReturnType<typeof categories.getServerSideProps>["props"];
  "/products": AsyncReturnType<typeof products.getServerSideProps>["props"];
  "/products/[slug]": AsyncReturnType<typeof product.getServerSideProps>["props"];
};
const getServerSidePropsForPage = satisfies<{ [P in keyof PageProps]: (props: PageProps[P]) => unknown }>()({
  "/home": (props) => parseUrqlState(props.urqlState),
  "/categories": (props) => parseUrqlState(props.urqlState),
  "/products": (props) => props,
  "/products/[slug]": (props) => parseUrqlState(props.urqlState),
});

type PageDataTypes = {
  [P in keyof typeof getServerSidePropsForPage]: ReturnType<typeof getServerSidePropsForPage[P]>;
};

/**
 * This method is a bit of a hack.
 * It takes the `urqlState` SSRData and extracts the raw data.
 */
export function parseUrqlState<TQuery>(urqlState: SSRData<TQuery>): TQuery {
  const keys = Object.keys(urqlState);
  if (keys.length === 0) throw new Error(`[parseUrqlState] urqlState did not have any entries`);
  if (keys.length >= 2) throw new Error(`[parseUrqlState] urqlState had multiple entries (not yet supported) ${keys}`);

  const { data, error } = urqlState[keys[0]];
  if (!data) {
    throw new Error(`[parseUrqlState] urqlState did not have any data. ${error}`);
  }

  return JSON.parse(data);
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    export interface Chainable<Subject = any> {
      /**
       * Retrieves the page's server-side props from __NEXT_DATA__.
       */
      getServerSideProps<TPage extends keyof PageDataTypes>(page: TPage): Chainable<PageDataTypes[TPage]>;
    }
  }
}

Cypress.Commands.add(
  "getServerSideProps",
  <TPage extends keyof PageDataTypes>(
    // We only use this parameter for strong types:
    page: TPage // eslint-disable-line @typescript-eslint/no-unused-vars
  ): Cypress.Chainable<PageDataTypes[TPage]> => {
    return cy.window().then((win) => {
      const props = win.__NEXT_DATA__.props.pageProps as any;
      const mapped = getServerSidePropsForPage[page](props as any) as PageDataTypes[TPage];
      return mapped;
    });
  }
);
