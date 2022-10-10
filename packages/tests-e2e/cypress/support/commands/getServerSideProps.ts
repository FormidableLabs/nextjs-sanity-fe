import type * as home from " ../../../../nextjs/pages/index";
import type * as categories from " ../../../../nextjs/pages/categories";
import type * as products from " ../../../../nextjs/pages/products/index";
import type * as product from " ../../../../nextjs/pages/products/[slug]";
import { satisfies } from "../../../../nextjs/utils/satisfies";
import { parseUrqlState } from "../../../../nextjs/utils/parseUrqlState";

type AsyncReturnType<TFunc extends (...args: any) => any> = UnwrapPromise<ReturnType<TFunc>>;
type UnwrapPromise<TPromiseMaybe> = TPromiseMaybe extends Promise<infer TValue> ? TValue : TPromiseMaybe;

type PageProps = {
  "/home": AsyncReturnType<typeof home.getServerSideProps>["props"];
  "/categories": AsyncReturnType<typeof categories.getServerSideProps>["props"];
  "/products": AsyncReturnType<typeof products.getServerSideProps>["props"];
  "/product": AsyncReturnType<typeof product.getServerSideProps>["props"];
};
const getServerSidePropsForPage = satisfies<{ [P in keyof PageProps]: (props: PageProps[P]) => unknown }>()({
  "/home": (props) => parseUrqlState(props.urqlState),
  "/categories": (props) => parseUrqlState(props.urqlState),
  "/products": (props) => props,
  "/product": (props) => parseUrqlState(props.urqlState),
});

type PageDataTypes = {
  [P in keyof typeof getServerSidePropsForPage]: ReturnType<typeof getServerSidePropsForPage[P]>;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    export interface Chainable<Subject = any> {
      /**
       *
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
