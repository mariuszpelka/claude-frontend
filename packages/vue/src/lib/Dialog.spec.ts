import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';
import Dialog from './Dialog.vue';
import DialogTrigger from './DialogTrigger.vue';

describe('Dialog (Vue)', () => {
  it('renders trigger', () => {
    const Wrapper = defineComponent({
      components: { Dialog, DialogTrigger },
      render() {
        return h(Dialog, null, {
          default: () => h(DialogTrigger, null, { default: () => 'Open' }),
        });
      },
    });
    const wrapper = mount(Wrapper, { attachTo: document.body });
    expect(wrapper.text()).toContain('Open');
  });
});
