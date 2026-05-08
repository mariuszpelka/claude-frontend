import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';
import DropdownMenu from './DropdownMenu.vue';
import DropdownMenuTrigger from './DropdownMenuTrigger.vue';

describe('DropdownMenu (Vue)', () => {
  it('renders trigger', () => {
    const Wrapper = defineComponent({
      components: { DropdownMenu, DropdownMenuTrigger },
      render() {
        return h(DropdownMenu, null, {
          default: () =>
            h(DropdownMenuTrigger, null, { default: () => 'Open' }),
        });
      },
    });
    const wrapper = mount(Wrapper, { attachTo: document.body });
    expect(wrapper.text()).toContain('Open');
  });
});
