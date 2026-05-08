import { describe, expect, it } from 'vitest';
import {
  DropdownMenuComponent,
  DropdownMenuItemComponent,
} from './dropdown-menu.component';

describe('DropdownMenu (Angular)', () => {
  it('exports component classes', () => {
    expect(DropdownMenuComponent).toBeDefined();
    expect(DropdownMenuItemComponent).toBeDefined();
  });
});
