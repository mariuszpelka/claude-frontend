import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tooltip } from './Tooltip.js';

describe('Tooltip', () => {
  it('renders trigger', () => {
    render(
      <Tooltip content="Hello">
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.getByRole('button', { name: 'Trigger' })).toBeDefined();
  });
});
