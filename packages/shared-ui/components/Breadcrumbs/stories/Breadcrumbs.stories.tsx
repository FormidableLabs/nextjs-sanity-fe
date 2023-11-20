import { BreadcrumbItem, BreadcrumbsContainer } from "..";
import { Meta, StoryObj } from "../../../.storybook/types";

const BreadcrumbExample = () => {
  return (
    <BreadcrumbsContainer>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Products</BreadcrumbItem>
      <BreadcrumbItem>One</BreadcrumbItem>
    </BreadcrumbsContainer>
  );
};

const meta: Meta<typeof BreadcrumbExample> = {
  component: BreadcrumbExample,
  title: "Breadcrumbs",
};

export default meta;

type Story = StoryObj<typeof BreadcrumbExample>;
export const Basic: Story = {};
