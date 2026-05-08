import type { Meta, StoryObj } from '@storybook/angular';
import { TooltipComponent } from './tooltip.component';
import { ButtonComponent } from './button.component';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<TooltipComponent> = {
  title: 'Components/Tooltip',
  component: TooltipComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ButtonComponent] })],
  argTypes: {
    side: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
    },
    delayDuration: { control: 'number' },
  },
  args: { content: 'Tooltip content', side: 'top', delayDuration: 300 },
  render: (args) => ({
    props: args,
    template: `<p4-tooltip [content]="content" [side]="side" [delayDuration]="delayDuration"><p4-button>Hover me</p4-button></p4-tooltip>`,
  }),
};

export default meta;
type Story = StoryObj<TooltipComponent>;

export const Default: Story = {};
