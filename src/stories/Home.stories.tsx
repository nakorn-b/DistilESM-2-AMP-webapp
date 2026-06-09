import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Home from '../components/Home';

const meta = {
  component: Home,
  tags: ['ai-generated'],
  args: {
    setActivePage: () => {},
  },
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /AMP Prediction Portal/i })).toBeVisible();
  },
};

export const CssCheck: Story = {
  play: async ({ canvas }) => {
    const heading = canvas.getByRole('heading', { level: 1 });
    // In this environment, getComputedStyle returns the oklch value directly.
    await expect(getComputedStyle(heading).color).toBe('oklch(0.205 0 0)');
  },
};
