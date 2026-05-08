import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';
import Tabs from './Tabs.vue';
import TabsList from './TabsList.vue';
import TabsTrigger from './TabsTrigger.vue';
import TabsContent from './TabsContent.vue';

describe('Tabs (Vue)', () => {
  it('renders selected tab content', () => {
    const Wrapper = defineComponent({
      components: { Tabs, TabsList, TabsTrigger, TabsContent },
      render() {
        return h(Tabs, { defaultValue: 'a' }, {
          default: () => [
            h(TabsList, null, {
              default: () => [
                h(TabsTrigger, { value: 'a' }, { default: () => 'A' }),
                h(TabsTrigger, { value: 'b' }, { default: () => 'B' }),
              ],
            }),
            h(TabsContent, { value: 'a' }, { default: () => 'Content A' }),
          ],
        });
      },
    });
    const wrapper = mount(Wrapper, { attachTo: document.body });
    expect(wrapper.text()).toContain('Content A');
  });
});
