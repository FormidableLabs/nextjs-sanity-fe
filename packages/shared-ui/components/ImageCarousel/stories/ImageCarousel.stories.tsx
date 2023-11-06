import type { Meta, StoryObj } from "../../../.storybook/types";
import { ImageCarousel as ImageCarouselBase } from "..";

const meta: Meta<typeof ImageCarouselBase> = {
  component: ImageCarouselBase,
  title: "ImageCarousel",
  tags: ["autodocs"],
};

export default meta;

export const ImageCarousel: StoryObj<typeof ImageCarouselBase> = {
  args: {
    children: [
      <img src="https://placehold.co/600x400/000000/FFF?text=1" alt="placeholder 1" />,
      <img src="https://placehold.co/600x400/000000/FFF?text=2" alt="placeholder 2" />,
      <img src="https://placehold.co/600x400/000000/FFF?text=3" alt="placeholder 3" />,
      <img src="https://placehold.co/600x400/000000/FFF?text=4" alt="placeholder 4" />,
    ],
  },
};
