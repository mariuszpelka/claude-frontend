import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './Button.js';

describe('Button', () => {
  it('renders a button element by default', () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole('button', { name: 'Click me' });
    expect(btn.tagName).toBe('BUTTON');
  });

  it('applies primary variant classes by default', () => {
    render(<Button>Click</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-primary-600');
  });

  it('renders the consumer element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/foo">Link</a>
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Link' });
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('/foo');
  });

  it('respects size and variant props', () => {
    render(
      <Button variant="danger" size="lg">
        Delete
      </Button>,
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-danger-600');
    expect(btn.className).toContain('h-12');
  });
});
