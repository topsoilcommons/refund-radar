const samples = [
  'Avery Patel | RR-10421 | Support confirmed my refund was issued Tuesday, but I never received a confirmation email. I opened this ticket to check.',
  'Maya Thompson | RR-10436 | My bank shows the refund was issued. There was no refund confirmation in my email or spam folder.',
  'Jordan Rivera | RR-10452 | An agent says my refund was already issued. I never got an email or receipt confirming it.',
  'Nora Sullivan | RR-10468 | The refund was issued according to my account, but I never received the usual confirmation email. I had to call support.',
  'Caleb Brooks | RR-10474 | The tracking page still says label created even though my delivery was due yesterday.',
  'Lena Morales | RR-10489 | The mug arrived cracked, and I need a replacement.',
  'Tariq Bennett | RR-10501 | My welcome promo code was rejected at checkout without any explanation.',
  'Olivia Chen | RR-10516 | I cannot sign in because the password reset link says it has already expired.',
].join('\n');

const load = document.querySelector('#load');
const input = document.querySelector('#tickets');
const generate = document.querySelector('#generate');
const copy = document.querySelector('#copy');
const count = document.querySelector('#ticket-count');
const brief = document.querySelector('#brief');
const fixes = document.querySelector('#fixes');
const recommendations = document.querySelector('#recommendations');
const generationStatus = document.querySelector('#generation-status');
const copyStatus = document.querySelector('#copy-status');
const reportPanel = document.querySelector('#report');
const emptyBrief = brief.textContent;

let copyText = '';

function updateInput() {
  const ticketCount = input.value.split('\n').filter((line) => line.trim()).length;
  count.textContent = ticketCount + (ticketCount === 1 ? ' ticket' : ' tickets');
  generate.disabled = !ticketCount;
  generationStatus.textContent = '';
  clearReport();
}

function clearReport() {
  copyText = '';
  copy.disabled = true;
  copyStatus.textContent = '';
  brief.textContent = emptyBrief;
  brief.classList.add('empty');
  recommendations.hidden = true;
  fixes.replaceChildren();
}

function showReport(report) {
  brief.textContent = report.brief;
  brief.classList.remove('empty');
  const lines = ['Refund Radar | Leadership brief', '', report.brief, '', 'Ranked fixes'];
  for (const [index, fix] of report.fixes.entries()) {
    const row = document.createElement('li');
    const action = document.createElement('strong');
    const detail = document.createElement('p');
    const evidence = document.createElement('span');
    const ticketLabel = fix.count + (fix.count === 1 ? ' ticket' : ' tickets');
    action.textContent = fix.action;
    detail.textContent = fix.why;
    evidence.textContent = ticketLabel;
    evidence.className = 'evidence';
    row.append(action, evidence, detail);
    fixes.append(row);
    lines.push((index + 1) + '. ' + fix.action + ' (' + ticketLabel + '). ' + fix.why);
  }
  copyText = lines.join('\n');
  recommendations.hidden = false;
  copy.disabled = false;
}

load.addEventListener('click', () => {
  input.value = samples;
  input.scrollTop = 0;
  updateInput();
});
input.addEventListener('input', updateInput);

generate.addEventListener('click', async () => {
  clearReport();
  load.disabled = input.disabled = generate.disabled = true;
  reportPanel.setAttribute('aria-busy', 'true');
  generationStatus.classList.remove('error');
  generationStatus.textContent = 'Analyzing complaints with NEAR AI…';
  try {
    const response = await fetch('/api/brief', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tickets: input.value }),
    });
    const report = await response.json();
    if (!response.ok) throw new Error(report.error);
    showReport(report);
    generationStatus.textContent = 'Brief ready.';
  } catch (error) {
    generationStatus.classList.add('error');
    generationStatus.textContent = error instanceof TypeError
      ? 'Could not reach Refund Radar. Check that the local server is running.'
      : error.message;
  } finally {
    load.disabled = input.disabled = generate.disabled = false;
    reportPanel.removeAttribute('aria-busy');
  }
});

copy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copyText);
    copyStatus.textContent = 'Brief and ranked fixes copied.';
  } catch {
    copyStatus.textContent = 'Clipboard unavailable. Select the brief and fixes to copy them manually.';
  }
});
