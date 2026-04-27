import { tokens, type Tokens } from '@p4/crm-mvp-components-tokens';

const indent = '  ';

function flattenColors(colors: Tokens['colors']): string[] {
  const lines: string[] = [];
  for (const [scale, shades] of Object.entries(colors)) {
    for (const [shade, value] of Object.entries(shades)) {
      lines.push(`${indent}--color-${scale}-${shade}: ${value};`);
    }
  }
  return lines;
}

function flattenSpacing(spacing: Tokens['spacing']): string[] {
  return Object.entries(spacing).map(
    ([key, value]) => `${indent}--spacing-${key}: ${value};`,
  );
}

function flattenRadius(radius: Tokens['radius']): string[] {
  return Object.entries(radius).map(
    ([key, value]) => `${indent}--radius-${key}: ${value};`,
  );
}

function flattenFontFamily(fonts: Tokens['fontFamily']): string[] {
  return Object.entries(fonts).map(
    ([key, value]) => `${indent}--font-${key}: ${value};`,
  );
}

function flattenFontSize(sizes: Tokens['fontSize']): string[] {
  const lines: string[] = [];
  for (const [key, [size, lineHeight]] of Object.entries(sizes)) {
    lines.push(`${indent}--text-${key}: ${size};`);
    lines.push(`${indent}--text-${key}--line-height: ${lineHeight};`);
  }
  return lines;
}

function flattenFontWeight(weights: Tokens['fontWeight']): string[] {
  return Object.entries(weights).map(
    ([key, value]) => `${indent}--font-weight-${key}: ${value};`,
  );
}

function flattenShadow(shadows: Tokens['shadow']): string[] {
  return Object.entries(shadows).map(
    ([key, value]) => `${indent}--shadow-${key}: ${value};`,
  );
}

function flattenMotion(motion: Tokens['motion']): string[] {
  const lines: string[] = [];
  for (const [key, value] of Object.entries(motion.duration)) {
    lines.push(`${indent}--duration-${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(motion.easing)) {
    lines.push(`${indent}--ease-${key}: ${value};`);
  }
  return lines;
}

export function themeFromTokens(source: Tokens = tokens): string {
  const lines = [
    '@theme {',
    ...flattenColors(source.colors),
    '',
    ...flattenSpacing(source.spacing),
    '',
    ...flattenRadius(source.radius),
    '',
    ...flattenFontFamily(source.fontFamily),
    '',
    ...flattenFontSize(source.fontSize),
    '',
    ...flattenFontWeight(source.fontWeight),
    '',
    ...flattenShadow(source.shadow),
    '',
    ...flattenMotion(source.motion),
    '}',
    '',
  ];
  return lines.join('\n');
}

export function presetCss(): string {
  return [
    '/* Auto-generated from @p4/crm-mvp-components-tokens. Do not edit by hand. */',
    '@import "tailwindcss";',
    '',
    themeFromTokens(),
  ].join('\n');
}
