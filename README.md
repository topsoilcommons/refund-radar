# Refund Radar

For support leads, Refund Radar briefs leadership and ranks fixes, and it needs private AI because tickets contain customer data.

[Try the public demo](https://refund-radar-f671.onrender.com/).

## Run locally

Use Node.js 22 or later. In macOS Terminal with zsh, open this project and run:

```zsh
read -rs 'NEAR_AI_API_KEY?Paste your NEAR AI Cloud key (hidden): ' && printf '\n' && export NEAR_AI_API_KEY && NEAR_AI_MODEL=z-ai/glm-5.3-flash node server.mjs
```

Open [Refund Radar](http://127.0.0.1:4310) in Chrome. The app binds to the loopback interface and uses no dependencies. Set `PORT` in the launch environment if port 4310 is occupied.

## 60-second demo

1. Click **Refund sample**, then **Generate brief**. Missing refund confirmations should rank first with four of eight tickets.
2. Open **View evidence** under the first fix. Ticket references correspond to the order of the input lines.
3. Click **Shipping sample**, then **Generate brief**. Late deliveries and stale tracking should move shipment status updates to the top, supported by four of eight tickets.
4. Click **Copy brief** to share the summary and ranked fixes without customer names, order IDs, or ticket references.

The hosted demo accepts the two fictional sample batches. Use the local app to try another batch.

## How it works

Each line follows `Customer name | Order ID | Complaint`. The local server assigns ticket references, strips the explicit identity fields, and replaces occurrences of each ticket's name and order ID in its own complaint. Other identifying text can still occur in complaint bodies. Use fictional data for this prototype.

The server makes one request to the [documented GLM 5.3 Flash Private TEE endpoint](https://near.ai/models/z-ai/glm-5.3-flash) per generation. The model classifies tickets into a fixed issue catalog. The server validates all assignments, counts each reference once, and writes the brief and fixes using fixed text and validated counts. Evidence panels display the supporting references. The brief and clipboard contain only the fixed wording and counts. The app does not independently verify attestation.
