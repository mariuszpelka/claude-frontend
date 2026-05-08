import { describe, expect, it } from 'vitest';
import { DialogComponent, DialogTitleComponent } from './dialog.component';

describe('Dialog (Angular)', () => {
  it('exports component classes', () => {
    expect(DialogComponent).toBeDefined();
    expect(DialogTitleComponent).toBeDefined();
  });
});
