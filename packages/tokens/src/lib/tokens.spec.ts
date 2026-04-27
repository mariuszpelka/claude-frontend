import { describe, expect, it } from 'vitest';
import { colors, fontWeight, radius, spacing, tokens } from './tokens.js';

describe('design tokens', () => {
  it('exposes the primary color scale 50–950', () => {
    expect(Object.keys(colors.primary)).toEqual([
      '50',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      '950',
    ]);
  });

  it('uses rem-based spacing', () => {
    expect(spacing[4]).toBe('1rem');
    expect(spacing[0]).toBe('0');
  });

  it('exposes radius scale including full pill', () => {
    expect(radius.full).toBe('9999px');
  });

  it('uses numeric font weights', () => {
    expect(fontWeight.normal).toBe('400');
    expect(fontWeight.bold).toBe('700');
  });

  it('aggregates all token groups', () => {
    expect(tokens.colors).toBe(colors);
    expect(tokens.spacing).toBe(spacing);
  });
});
