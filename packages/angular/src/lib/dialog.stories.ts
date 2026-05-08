import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  DialogComponent,
  DialogTitleComponent,
  DialogDescriptionComponent,
} from './dialog.component';
import { ButtonComponent } from './button.component';

const meta: Meta<DialogComponent> = {
  title: 'Components/Dialog',
  component: DialogComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DialogTitleComponent, DialogDescriptionComponent, ButtonComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<DialogComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <p4-dialog>
        <span trigger>Open Dialog</span>
        <ng-container content>
          <p4-dialog-title>Are you sure?</p4-dialog-title>
          <p4-dialog-description>This action cannot be undone.</p4-dialog-description>
        </ng-container>
      </p4-dialog>
    `,
  }),
};
