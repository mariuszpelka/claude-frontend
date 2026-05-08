import type { StorybookConfig } from '@storybook/react-vite';

const isProd = process.env.NODE_ENV === 'production';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  refs: isProd
    ? {
        react: {
          title: 'React',
          url: './storybook-react',
        },
        vue: {
          title: 'Vue',
          url: './storybook-vue',
        },
        angular: {
          title: 'Angular',
          url: './storybook-angular',
        },
      }
    : {},
};

export default config;
