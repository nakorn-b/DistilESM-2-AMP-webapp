import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import BatchProcessing from '../components/BatchProcessing';

const meta = {
  component: BatchProcessing,
  tags: ['ai-generated'],
  args: {
    recentAnalyses: [],
    handleBatchPredict: (file: File) => ({ file }),
    isPredicting: false,
  },
} satisfies Meta<typeof BatchProcessing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithResults: Story = {
  args: {
    recentAnalyses: [
      {
        id: 'BATCH_001',
        name: 'MKTLLILT',
        timestamp: '2026-06-02T08:00:00Z',
        status: 'Completed',
        ampProbability: 0.95,
        predictedClass: 'Antimicrobial',
      },
      {
        id: 'BATCH_002',
        name: 'ACDEFGH',
        timestamp: '2026-06-02T08:05:00Z',
        status: 'Completed',
        ampProbability: 0.92,
        predictedClass: 'Non-Antimicrobial',
      },
    ],
  },
  play: async ({ canvas }) => {
    // Assert presence of data rows
    await canvas.findByText('MKTLLILT');
    await canvas.findByText('Antimicrobial');
  },
};

export const Predicting: Story = {
  args: {
    isPredicting: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Analyzing Dataset/i)).toBeVisible();
  },
};
