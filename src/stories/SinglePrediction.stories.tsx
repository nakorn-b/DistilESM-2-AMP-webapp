import type { Meta, StoryObj } from '@storybook/react-vite';
import SinglePrediction from '../components/SinglePrediction';

const meta = {
  component: SinglePrediction,
  tags: ['ai-generated'],
  args: {
    sequence: '',
    setSequence: () => {},
    isPredicting: false,
    handlePredict: () => {},
    results: null,
  },
} satisfies Meta<typeof SinglePrediction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSequence: Story = {
  args: {
    sequence: 'MKTLLILT',
  },
};

export const Predicting: Story = {
  args: {
    sequence: 'MKTLLILT',
    isPredicting: true,
  },
  play: async ({ canvas }) => {
    await canvas.findByText(/Analyzing/i);
  },
};

export const WithResults: Story = {
  args: {
    sequence: 'MKTLLILT',
    results: {
      id: 'AMP_12345',
      name: 'Analysis_123',
      timestamp: '2026-06-02T08:00:00Z',
      status: 'Completed',
      ampProbability: 0.98,
      predictedClass: 'Antimicrobial',
    },
  },
  play: async ({ canvas }) => {
    await canvas.findByText(/Antimicrobial/i);
    await canvas.findByText(/98.0/i);
  },
};
