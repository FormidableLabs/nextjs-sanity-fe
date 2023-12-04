import { generateMockData } from "mocks/msw/db/mock-data";
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
      it("I see 6 products", () => {
        [
          "Seeded Sourdough Loaf",
          "Pain au Chocolat",
          "Sourdough Loaf",
          "Chocolate Croissant",
          "Whole Grain Potato Rosemary",
          "Lemon Tart",
        ].forEach((variant) => {
          cy.findByText(variant).should("exist");
        });
      });

      it("I see pagination at the bottom of the page", () => {
        cy.findByText("Previous").should("exist");
        cy.findByText("Next").should("exist");

        const pageCount = 4;
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
