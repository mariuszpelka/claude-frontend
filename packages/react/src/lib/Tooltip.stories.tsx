import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip.js';
import { Button } from './Button.js';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'Tooltip content',
    children: <Button>Hover me</Button>,
  },
};

export const TopSide: Story = {
  args: {
    content: 'Top side',
    side: 'top',
    children: <Button>Top</Button>,
  },
};

export const RightSide: Story = {
  args: {
    content: 'Right side',
    side: 'right',
    children: <Button>Right</Button>,
  },
};
