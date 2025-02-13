import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const variantOptions = ["primary", "default", "dashed", "ghost", "link"];
const sizeOptions = ["default"];

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: variantOptions,
      },
    },
    size: {
      control: {
        type: "select",
        options: sizeOptions,
      },
    },
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Default Button",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "default",
    children: "Primary Button",
  },
};

export const Dashed: Story = {
  args: {
    variant: "dashed",
    size: "default",
    children: "Dashed Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "default",
    children: "Ghost Button",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    size: "default",
    children: "Link Button",
  },
};
