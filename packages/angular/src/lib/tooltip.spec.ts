import { describe, expect, it } from 'vitest';
import { TooltipComponent } from './tooltip.component';

describe('TooltipComponent (Angular)', () => {
  it('exports the component class', () => {
    expect(TooltipComponent).toBeDefined();
    expect(typeof TooltipComponent).toBe('function');
  });
});
