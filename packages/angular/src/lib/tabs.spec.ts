import { describe, expect, it } from 'vitest';
import {
  TabsComponent,
  TabsListComponent,
  TabsTriggerComponent,
  TabsContentComponent,
} from './tabs.component';

describe('Tabs (Angular)', () => {
  it('exports component classes', () => {
    expect(TabsComponent).toBeDefined();
    expect(TabsListComponent).toBeDefined();
    expect(TabsTriggerComponent).toBeDefined();
    expect(TabsContentComponent).toBeDefined();
  });
});
