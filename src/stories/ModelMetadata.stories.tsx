import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ModelMetadata from '../components/ModelMetadata';

const meta = {
  component: ModelMetadata,
  tags: ['ai-generated'],
} satisfies Meta<typeof ModelMetadata>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Technical Metadata/i)).toBeVisible();
    await expect(canvas.getByText(/8M/i)).toBeVisible();
  },
};
