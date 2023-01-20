import { generateMockData } from "mocks/msw/db/mock-data";
import type { PageDataTypes } from "../cypress/support/commands/getServerSideProps";
import { mockOnly } from "../utils/real-or-mock";

describe("when I visit the products page", () => {
  mockOnly.before(() => {
    cy.setMockData(generateMockData());
  });
  before(() => {
    cy.visit("/products");
  });

  it("I see the Products title", () => {
    cy.get("main").within(() => {
      cy.findByText("Products").should("exist");
    });
  });
  it("I see a sidebar with filters and sorts", () => {
    cy.findByText("Sort by");
    cy.findByText("Filters");
    cy.findByText("Flavour");
    cy.findByText("Style");
    cy.findByText("Promotion");
  });

  describe("on the default page", () => {
    let pageProps: PageDataTypes["/products"];
    before(async () => {
      cy.getServerSideProps("/products").then((props) => {
        pageProps = props;
      });
    });

    const EXPECTED_ITEMS_PER_PAGE = 6;
    const EXPECTED_ITEMS_MINIMUM = 10;

    it("I see 6 products", () => {
      expect(pageProps.productVariants.length).to.equal(
        EXPECTED_ITEMS_PER_PAGE,
        `there should be ${EXPECTED_ITEMS_PER_PAGE} items on this page`
      );
      expect(pageProps.itemCount).to.gte(
        EXPECTED_ITEMS_MINIMUM,
        `there should be at least ${EXPECTED_ITEMS_MINIMUM} items`
      );

      pageProps.productVariants.forEach((variant) => {
        cy.findByText(variant.name).should("exist");
      });
    });

    it("I see pagination at the bottom of the page", () => {
      cy.findByText("Previous").should("exist");
      cy.findByText("Next").should("exist");

      const pageCount = pageProps.pageCount;
      for (let i = 0; i < pageCount; i++) {
        cy.findByText(`${i + 1}`).should("exist");
      }
    });
  });
});
