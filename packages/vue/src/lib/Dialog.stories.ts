import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Dialog from './Dialog.vue';
import DialogTrigger from './DialogTrigger.vue';
import DialogContent from './DialogContent.vue';
import DialogTitle from './DialogTitle.vue';
import DialogDescription from './DialogDescription.vue';
import Button from './Button.vue';

const meta = {
  title: 'Components/Dialog',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, Button },
    template: `
      <Dialog>
        <DialogTrigger as-child>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    `,
  }),
};
