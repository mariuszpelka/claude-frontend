import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  TabsComponent,
  TabsListComponent,
  TabsTriggerComponent,
  TabsContentComponent,
} from './tabs.component';

const meta: Meta<TabsComponent> = {
  title: 'Components/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        TabsListComponent,
        TabsTriggerComponent,
        TabsContentComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<TabsComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <p4-tabs defaultValue="account" class="w-[400px]">
        <p4-tabs-list>
          <p4-tabs-trigger value="account">Account</p4-tabs-trigger>
          <p4-tabs-trigger value="password">Password</p4-tabs-trigger>
        </p4-tabs-list>
        <p4-tabs-content value="account">Account settings</p4-tabs-content>
        <p4-tabs-content value="password">Password settings</p4-tabs-content>
      </p4-tabs>
    `,
  }),
};
