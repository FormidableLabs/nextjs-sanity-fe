import type { Meta, StoryObj } from "../../.storybook/types";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  args: {
    pageCount: 4,
    currentPage: 1,
    renderPaginationLink: ({ page, href }) => <a href={href}>{page}</a>,
    currentHref: "/products",
    search: "",
  },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {};
