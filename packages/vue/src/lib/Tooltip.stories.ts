import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Tooltip from './Tooltip.vue';
import Button from './Button.vue';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    side: { control: { type: 'select' }, options: ['top', 'right', 'bottom', 'left'] },
    delayDuration: { control: 'number' },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { side: 'top', delayDuration: 300 },
  render: (args) => ({
    components: { Tooltip, Button },
    setup: () => ({ args }),
    template: `
      <Tooltip v-bind="args">
        <Button>Hover me</Button>
        <template #content>Tooltip content</template>
      </Tooltip>
    `,
  }),
};
