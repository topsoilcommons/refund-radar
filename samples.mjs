export const samples = [
  'Avery Patel | RR-10421 | Support confirmed my refund was issued Tuesday, but I never received a confirmation email. I opened this ticket to check.',
  'Maya Thompson | RR-10436 | My bank shows the refund was issued. There was no refund confirmation in my email or spam folder.',
  'Jordan Rivera | RR-10452 | An agent says my refund was already issued. I never got an email or receipt confirming it.',
  'Nora Sullivan | RR-10468 | The refund was issued according to my account, but I never received the usual confirmation email. I had to call support.',
  'Caleb Brooks | RR-10474 | The tracking page still says label created even though my delivery was due yesterday.',
  'Lena Morales | RR-10489 | The mug arrived cracked, and I need a replacement.',
  'Tariq Bennett | RR-10501 | My welcome promo code was rejected at checkout without any explanation.',
  'Olivia Chen | RR-10516 | I cannot sign in because the password reset link says it has already expired.',
].join('\n');

export const shippingSamples = [
  'Emilia Park | RR-10701 | My delivery missed its promised date and tracking has shown the same location for three days.',
  'Darius Coleman | RR-10714 | My card was charged twice for one order. Please check the duplicate charge.',
  'Mina Shah | RR-10726 | The tracking link still says a label was created even though the package was supposed to arrive yesterday.',
  'Theo Morgan | RR-10738 | The plates arrived broken. Please send a replacement.',
  'Sofia Alvarez | RR-10749 | My package is two days late and the carrier has not posted a new estimate.',
  'Jules Okafor | RR-10755 | The advertised discount code was rejected at checkout.',
  'Noah Kim | RR-10763 | My order is overdue and the shipment status has not updated since last week.',
  'Iris Nguyen | RR-10781 | The password reset email keeps sending me an expired link.',
].join('\n');

export const intentsReports = [
  {
    ref: 'T01',
    summary: 'A cross-chain swap was reported as still processing more than 20 days later. The customer said no refund had arrived and asked for a status update.',
    status: 'Processing when reported',
    refund: 'Unconfirmed. The reporter said no refund arrived.',
    nextCheck: 'Check the latest swap status and look for destination or refund transaction evidence.',
    source: 'NEAR Intents issue #399',
    url: 'https://github.com/near/intents/issues/399',
  },
  {
    ref: 'T02',
    summary: 'A cross-chain swap was reported as failed with no refund recorded in the status response. The customer said several support channels did not provide a clear update.',
    status: 'Failed when reported',
    refund: 'Unconfirmed. The reporter said the status showed zero refunded.',
    nextCheck: 'Check for a refund transaction and identify who owns the support case.',
    source: 'NEAR Forum report',
    url: 'https://gov.near.org/t/failed-near-intents-1-click-swap-575-830-trx-193k-stuck-failed-status-zero-refund-no-support-response/42664',
  },
  {
    ref: 'T03',
    summary: 'A wallet integrator reported that two completed swaps were missing from the connected wallet’s transaction history, even though other queries could find them.',
    status: 'Completed, according to the integrator',
    refund: 'Unspecified in the report.',
    nextCheck: 'Compare wallet history with the transaction status records and flag the missing history entries.',
    source: 'Swap widget issue #325',
    url: 'https://github.com/aurora-is-near/intents-swap-widget/issues/325',
  },
];

export const intentsSamples = intentsReports
  .map(({ ref, summary }) => 'Public report | ' + ref + ' | ' + summary)
  .join('\n');
