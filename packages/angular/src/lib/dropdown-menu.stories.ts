import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  DropdownMenuComponent,
  DropdownMenuItemComponent,
  DropdownMenuLabelComponent,
  DropdownMenuSeparatorComponent,
} from './dropdown-menu.component';
import { ButtonComponent } from './button.component';

const meta: Meta<DropdownMenuComponent> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenuComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        DropdownMenuItemComponent,
        DropdownMenuLabelComponent,
        DropdownMenuSeparatorComponent,
        ButtonComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<DropdownMenuComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <p4-dropdown-menu>
        <span trigger>Open menu</span>
        <ng-container content>
          <p4-dropdown-menu-label>My Account</p4-dropdown-menu-label>
          <p4-dropdown-menu-separator />
          <p4-dropdown-menu-item>Profile</p4-dropdown-menu-item>
          <p4-dropdown-menu-item>Billing</p4-dropdown-menu-item>
          <p4-dropdown-menu-item>Settings</p4-dropdown-menu-item>
          <p4-dropdown-menu-separator />
          <p4-dropdown-menu-item>Log out</p4-dropdown-menu-item>
        </ng-container>
      </p4-dropdown-menu>
    `,
  }),
};
