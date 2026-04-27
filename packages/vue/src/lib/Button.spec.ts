import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Button from './Button.vue';

describe('Button (Vue)', () => {
  it('renders a button by default with primary variant', () => {
    const wrapper = mount(Button, { slots: { default: 'Click me' } });
    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.classes().join(' ')).toContain('bg-primary-600');
    expect(wrapper.text()).toBe('Click me');
  });

  it('respects variant and size props', () => {
    const wrapper = mount(Button, {
      props: { variant: 'danger', size: 'lg' },
      slots: { default: 'Delete' },
    });
    const cls = wrapper.classes().join(' ');
    expect(cls).toContain('bg-danger-600');
    expect(cls).toContain('h-12');
  });

  it('renders the slotted element when asChild is true', () => {
    const wrapper = mount(Button, {
      props: { asChild: true },
      slots: { default: '<a href="/foo">Link</a>' },
    });
    const anchor = wrapper.find('a');
    expect(anchor.exists()).toBe(true);
    expect(anchor.attributes('href')).toBe('/foo');
  });
});
