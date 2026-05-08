import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';
import Tooltip from './Tooltip.vue';

describe('Tooltip (Vue)', () => {
  it('renders trigger slot', () => {
    const Wrapper = defineComponent({
      components: { Tooltip },
      render() {
        return h(Tooltip, null, {
          default: () => h('button', { type: 'button' }, 'Trigger'),
          content: () => 'Tooltip',
        });
      },
    });
    const wrapper = mount(Wrapper);
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('Trigger');
  });
});
