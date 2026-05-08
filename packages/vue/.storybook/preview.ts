import type { Preview } from '@storybook/vue3-vite';
import '@p4/crm-mvp-components-tailwind-preset/preset.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
};

export default preview;
