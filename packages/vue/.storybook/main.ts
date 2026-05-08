import type { StorybookConfig } from '@storybook/vue3-vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|mjs|ts)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: async (cfg) => {
    cfg.plugins = [...(cfg.plugins ?? []), vue(), tailwindcss()];
    return cfg;
  },
};

export default config;
