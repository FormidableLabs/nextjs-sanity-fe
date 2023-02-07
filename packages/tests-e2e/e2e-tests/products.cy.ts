import { generateMockData } from "mocks/msw/db/mock-data";
import type { PageDataTypes } from "../cypress/support/commands/getServerSideProps";
import { mockOnly } from "../utils/real-or-mock";

describe("when I visit the products page", () => {
  mockOnly.before(() => {
    cy.setMockData(generateMockData());
  });

  context("on a desktop browser", () => {
    before(() => {
      cy.viewport("macbook-13");
      cy.visit("/products");
    });

    it("I see the Products title", () => {
      cy.get("main").within(() => {
        cy.get("h1.text-h1").should("exist");
        cy.get("h1.text-h1").contains("Products");
      });
    });

    it("I see a sidebar with filters and sorts", () => {
      cy.get("section").within(() => {
        cy.findAllByText("Sort by");
        cy.findAllByText("Filters");
        cy.findByText("Category");
        cy.findByText("Flavour");
        cy.findByText("Style");
        cy.findByText("Promotion");
      });
    });

    it("the mobile sorting list and 'Filters' button are not present", () => {
      cy.get("section").within(() => {
        cy.findByRole("button", {
          name: "toggle menu",
        }).should("not.exist");

        cy.findByRole("button", {
          name: "Filters",
        }).should("not.exist");
      });
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
        expect(pageProps.variants.length).to.equal(
          EXPECTED_ITEMS_PER_PAGE,
          `there should be ${EXPECTED_ITEMS_PER_PAGE} items on this page`
        );
        expect(pageProps.itemCount).to.gte(
          EXPECTED_ITEMS_MINIMUM,
          `there should be at least ${EXPECTED_ITEMS_MINIMUM} items`
        );

        pageProps.variants.forEach((variant) => {
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

  context("on a mobile device", () => {
    beforeEach(() => {
      cy.viewport("iphone-x");
      cy.visit("/products");
    });

    it("the sidebar filters are not visible", () => {
      cy.get("section").within(() => {
        cy.findByText("Category").should("not.be.visible");
        cy.findByText("Flavour").should("not.be.visible");
        cy.findByText("Style").should("not.be.visible");
        cy.findByText("Promotion").should("not.be.visible");
      });
    });

    it("I see a list of sort options and a the 'Filters' button", () => {
      cy.get("section").within(() => {
        // Title and select element.
        cy.findAllByText("Sort by");
        cy.findByRole("button", {
          name: "toggle menu",
        }).should("exist");

        // Title and button.
        cy.findAllByText("Filters");
        cy.findByRole("button", {
          name: "Filters",
        }).should("exist");
      });
    });

    it("when I click the button, I see filters options on a modal window", () => {
      cy.get("section").within(() => {
        cy.findByRole("button", {
          name: "Filters",
        }).click();
      });

      // Modal is displayed.
      cy.findByRole("dialog").should("exist");

      cy.findByRole("dialog").within(() => {
        cy.findByText("Filters");
        cy.findByText("Category");
        cy.findByText("Flavour");
        cy.findByText("Style");
        cy.findByText("Promotion");
        cy.findByText("View results");
      });
    });
  });
});
