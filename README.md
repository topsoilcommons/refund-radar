# Refund Radar

Refund Radar helps support leads spot recurring problems, check the reports behind each finding, and share a brief with leadership. The NEAR Intents demo uses three real public reports about swap and refund visibility and missing wallet history.

[Try the public demo](https://refund-radar-f671.onrender.com/).

## Run locally

Use Node.js 22 or later. In macOS Terminal with zsh, open this project and run:

```zsh
read -rs 'NEAR_AI_API_KEY?Paste your NEAR AI Cloud key (hidden): ' && printf '\n' && export NEAR_AI_API_KEY && NEAR_AI_MODEL=z-ai/glm-5.3-flash node server.mjs
```

Open [Refund Radar](http://127.0.0.1:4310) in Chrome. The app binds to the loopback interface and uses no dependencies. Set `PORT` in the launch environment if port 4310 is occupied.

## 60-second demo

1. Click **Run the live demo**. The expected top fix is to show swap status and refund evidence in one place, supported by two of three reports.
2. Open **See the reports** under a fix. Each supporting report links to its public source and shows the reported status, available refund evidence, and a suggested next check.
3. Click **Copy brief** to share the summary and ranked fixes without customer names, order IDs, or ticket references.

The public reports are paraphrased and describe historical observations. Refund Radar does not query current swap or refund status or move funds. It sends only the summaries and internal references to the model. The **Refund sample** and **Shipping sample** are fictional comparison batches. Use the local app to try another batch.

## How it works

Each line follows `Customer name | Order ID | Complaint`. The local server assigns ticket references, strips the explicit identity fields, and replaces occurrences of each ticket's name and order ID in its own complaint. Other identifying text can still occur in complaint bodies. Use fictional data for this prototype.

The server makes one request to the [documented GLM 5.3 Flash Private TEE endpoint](https://near.ai/models/z-ai/glm-5.3-flash) per generation. The model classifies tickets into a fixed issue catalog. The server validates all assignments, counts each reference once, and writes the brief and fixes using fixed text and validated counts. Evidence panels display the supporting references. The brief and clipboard contain only the fixed wording and counts. The app does not independently verify attestation.
