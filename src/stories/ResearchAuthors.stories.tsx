import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ResearchAuthors from '../components/ResearchAuthors';

const meta = {
  component: ResearchAuthors,
  tags: ['ai-generated'],
} satisfies Meta<typeof ResearchAuthors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Research & Authorship/i)).toBeVisible();
    await expect(canvas.getByText(/Nakorn Boonprasong/i)).toBeVisible();
  },
};
