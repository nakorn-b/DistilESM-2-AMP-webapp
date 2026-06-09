import type { Preview } from '@storybook/react-vite'
import '../src/index.css'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { mswHandlers } from './msw-handlers'

initialize({ onUnhandledRequest: 'bypass' })

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    msw: {
      handlers: mswHandlers
    },
    a11y: {
      test: 'todo'
    }
  },
  loaders: [mswLoader],
};

export default preview;