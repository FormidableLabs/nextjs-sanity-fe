import type { Meta, StoryObj } from ".storybook/types";
import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";

import { Search } from "./Search";

const meta: Meta<typeof Search> = {
  component: Search,
  args: {},
};

export default meta;

type Story = StoryObj<typeof Search>;

export const Default: Story = {
  async play({ canvasElement, step }) {
    const ui = wrap(canvasElement);
    await step("expect to see a search box", async () => {
      expect(ui.searchbox).toBeVisible();
    });
  },
};

export const WithSearchTerm: Story = {
  async play({ canvasElement, step }) {
    const ui = wrap(canvasElement);

    await step("Type 'baguette' into the search box", async () => {
      ui.searchbox.focus();
      await userEvent.type(ui.searchbox, "baguette");
    });

    await step("expect to see a loading indicator", async () => {
      expect(ui.resultsBox).toBeVisible();
      expect(ui.resultsBox).toHaveTextContent("Loading...");
      expect(ui.results).toHaveLength(1);
    });

    await step("expect to see some search results", async () => {
      await waitFor(
        () => {
          expect(ui.results.length).toBeGreaterThanOrEqual(2);
        },
        { timeout: 3000 }
      );
    });
  },
};

export const WithSearchTerm_Test_FilteredResults: Story = {
  name: "With Search Term / Test / Filtered Results",
  async play(ctx) {
    // eslint-disable-next-line storybook/context-in-play-function
    await WithSearchTerm.play!(ctx);

    const { canvasElement, step } = ctx;
    const ui = wrap(canvasElement);

    await step("type 'plain'", async () => {
      await userEvent.type(ui.searchbox, " plain");
    });

    await step("there should be one result", async () => {
      await waitFor(() => {
        expect(ui.results).toHaveLength(1);
        expect(ui.results[0]).toHaveTextContent("Plain Baguette");
      });
    });
  },
};
export const WithSearchTerm_Test_NoResults: Story = {
  name: "With Search Term / Test / No Results",
  async play(ctx) {
    // eslint-disable-next-line storybook/context-in-play-function
    await WithSearchTerm.play!(ctx);

    const { canvasElement, step } = ctx;
    const ui = wrap(canvasElement);

    await step("update text to 'cake'", async () => {
      await userEvent.clear(ui.searchbox);
      await userEvent.type(ui.searchbox, "cake");
    });

    await step("there should be no results", async () => {
      await waitFor(() => {
        expect(ui.results).toHaveLength(1);
        expect(ui.results[0]).toHaveTextContent("No Products Found");
      });
    });
  },
};
export const WithSearchTerm_Test_Cleared: Story = {
  name: "With Search Term / Test / Cleared",
  async play(ctx) {
    // eslint-disable-next-line storybook/context-in-play-function
    await WithSearchTerm.play!(ctx);

    const { canvasElement, step } = ctx;
    const ui = wrap(canvasElement);

    await step("clear all text", async () => {
      await userEvent.clear(ui.searchbox);
    });

    await step("there should be no preview box", async () => {
      await waitFor(() => {
        expect(ui.resultsBox).not.toBeInTheDocument();
      });
    });
  },
};

/** Encapsulate all UI elements for easier testing */
function wrap(canvasElement: HTMLElement) {
  const container = within(canvasElement);
  return {
    get searchbox() {
      return container.getByRole("searchbox");
    },
    get resultsBox() {
      return container.queryByRole("listbox");
    },
    get results() {
      return container.queryAllByRole("listitem");
    },
  };
}
