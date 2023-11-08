import { Meta, StoryObj } from "../../.storybook/types";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  component: Card,
  args: {
    to: "/",
    subTitle: "Subtitle",
    title: "Title",
    price: 4.0,
    children: <div>child</div>,
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {};
