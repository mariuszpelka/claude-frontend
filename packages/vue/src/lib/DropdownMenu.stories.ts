import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DropdownMenu from './DropdownMenu.vue';
import DropdownMenuTrigger from './DropdownMenuTrigger.vue';
import DropdownMenuContent from './DropdownMenuContent.vue';
import DropdownMenuItem from './DropdownMenuItem.vue';
import DropdownMenuLabel from './DropdownMenuLabel.vue';
import DropdownMenuSeparator from './DropdownMenuSeparator.vue';
import Button from './Button.vue';

const meta = {
  title: 'Components/DropdownMenu',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: {
      DropdownMenu,
      DropdownMenuTrigger,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      Button,
    },
    template: `
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="secondary">Open menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    `,
  }),
};
