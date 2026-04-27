import { describe, expect, it } from 'vitest';
import { presetCss, themeFromTokens } from './preset.js';

describe('themeFromTokens', () => {
  it('emits an @theme block', () => {
    const css = themeFromTokens();
    expect(css.startsWith('@theme {')).toBe(true);
    expect(css.trim().endsWith('}')).toBe(true);
  });

  it('exposes color scales as --color-<scale>-<shade>', () => {
    const css = themeFromTokens();
    expect(css).toContain('--color-primary-500: #a855f7;');
    expect(css).toContain('--color-neutral-900: #18181b;');
  });

  it('exposes spacing as --spacing-<key>', () => {
    expect(themeFromTokens()).toContain('--spacing-4: 1rem;');
  });

  it('emits font sizes with paired line-height', () => {
    const css = themeFromTokens();
    expect(css).toContain('--text-base: 1rem;');
    expect(css).toContain('--text-base--line-height: 1.5rem;');
  });

  it('emits motion as --duration and --ease', () => {
    const css = themeFromTokens();
    expect(css).toContain('--duration-base: 180ms;');
    expect(css).toContain('--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);');
  });
});

describe('presetCss', () => {
  it('imports tailwindcss and embeds the theme', () => {
    const css = presetCss();
    expect(css).toContain('@import "tailwindcss";');
    expect(css).toContain('@theme {');
    expect(css).toContain('--color-primary-500: #a855f7;');
  });
});
