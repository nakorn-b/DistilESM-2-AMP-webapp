import { http, HttpResponse } from 'msw';

export const mswHandlers = [
  http.post('*/predict', async ({ request }) => {
    const { sequence } = await request.json() as { sequence: string };
    return HttpResponse.json({
      prediction: "AMP",
      confidence: 0.98,
      sequence: sequence
    });
  }),
  http.post('*/predict_batch', async () => {
    return HttpResponse.json([
      { sequence: "MKTLLILT", confidence: 0.95, class: "AMP" },
      { sequence: "ACDEFGH", confidence: 0.92, class: "Non-AMP" }
    ]);
  }),
];
