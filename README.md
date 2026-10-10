<h1 align="center">Distil-ESM2-AMP</h1>

This is the web application for [distilESM-2-AMP](https://github.com/nakorn-b/distilESM-2-AMP) model. Paste a single sequence or upload a CSV dataset, and the web application returns an AMP classification and probability for each sequence.

## Tech stack

- **React + TypeScript**, built with Vite
- **Tailwind CSS** and shadcn/ui for the interface
- **ONNX Runtime Web** for client-side prediction

Prediction runs entirely in the browser. The model ([NakornB/distilESM-2-AMP](https://huggingface.co/NakornB/distilESM-2-AMP)) is
exported to ONNX and served from `public/model/`.

## Running locally

Requires [Bun](https://bun.sh).

```bash
bun install
bun run dev
```

Then open the URL Vite prints (usually http://localhost:5173). To try batch
prediction, upload `public/example_dataset.csv`.

## Contact

Nakorn Boonprasong 
Email: boonprasongnakorn@gmail.com
[Hugging Face @NakornB](https://huggingface.co/NakornB)
[Linkedln](https://www.linkedin.com/in/nakornb/)
