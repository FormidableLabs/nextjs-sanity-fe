import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { Search } from "./Search";

const meta: Meta<typeof Search> = {
  component: Search,
  args: {},
};

export default meta;

type Story = StoryObj<typeof Search>;

export const Default: Story = {};

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

/** Encapsulate all UI elements for easier testing */
function wrap(canvasElement: HTMLElement) {
  const container = within(canvasElement);
  return {
    get searchbox() {
      return container.getByRole("searchbox");
    },
    get resultsBox() {
      return container.getByRole("listbox");
    },
    get results() {
      return container.queryAllByRole("listitem");
    },
  };
}
