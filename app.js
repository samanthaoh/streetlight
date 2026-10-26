const presentation = 'https://www.fairfaxcounty.gov/providence/sites/providence/files/Assets/Documents/PDF/Blake%20Lane%20RSA%20-%20Outreach%20Meeting%201.pdf';
const evidence = [
  { id: 'corridor', page: 8, label: 'CORRIDOR OBSERVATIONS', title: 'Accessibility & vehicle speeds', text: 'The presentation identifies accessibility barriers, limited pedestrian cues, peak-period speeds, turning geometry, and trail connections.' },
  { id: 'crossings', page: 9, label: 'CROSSING OBSERVATIONS', title: 'Crossings & transit connections', text: 'Reported concerns include uncontrolled crossing conflicts, wide crossings, and transit stops that do not align with marked crosswalks.' },
  { id: 'night', page: 11, label: 'NIGHTTIME OBSERVATIONS', title: 'Visibility after dark', text: 'The presentation reports difficulty seeing pedestrians in dark conditions.' },
  { id: 'plans', page: 17, label: 'HISTORICAL PLANS', title: 'Improvements listed as upcoming', text: 'Flashing beacons at Bushman Drive and Bel Glade Street, plus Sutton Road intersection enhancements, were listed as upcoming in May 2023.' }
];
const answers = {
  overview: { title: 'A starting point for your field review', intro: 'These proposed review tasks connect historical findings to questions for staff. They are not an assessment of current conditions.', items: [
    ['Review accessible paths', 'Check whether previously identified accessibility and speed concerns persist.', 'corridor'],
    ['Walk the crossing connections', 'Revisit crossing exposure and the connection between transit stops and marked crossings.', 'crossings'],
    ['Include a review after dark', 'Consider whether a nighttime visit would help assess visibility concerns.', 'night']
  ] },
  concerns: { title: 'What concerns were documented?', intro: 'The May 2023 presentation groups observations across the corridor and at pedestrian crossings.', items: [
    ['Corridor-wide concerns', evidence[0].text, 'corridor'],
    ['Crossing concerns', evidence[1].text, 'crossings'],
    ['Nighttime visibility', evidence[2].text, 'night']
  ] },
  plans: { title: 'What improvements were planned?', intro: 'This answer preserves the status reported in May 2023.', items: [
    ['Listed as upcoming', evidence[3].text, 'plans'],
    ['Confirm implementation separately', 'A historical plan does not establish completion. Review the final audit and newer project records before assigning a current status.', null]
  ] },
  night: { title: 'What was observed at night?', intro: 'A historical observation to follow up during a corridor review.', items: [
    ['Pedestrian visibility', evidence[2].text, 'night'],
    ['A question for the next review', 'Have lighting, crossing conditions, or visibility changed since the presentation? Newer observations are needed.', null]
  ] },
  unknown: { title: 'That answer is not available in this demo.', intro: 'This prototype has curated answers to a small set of questions. It has not searched the full audit or evaluated your question with an AI model.', items: [
    ['Try a supported question', 'Explore documented concerns, nighttime observations, historical improvement plans, or field-review preparation.', null],
    ['Keep the uncertainty visible', 'Current completion status, crash reductions, and causal safety effects cannot be established by this demo.', null]
  ] }
};
const prompts = [
  ['What concerns were documented?', 'concerns'],
  ['What improvements were planned?', 'plans'],
  ['What was observed at night?', 'night']
];
const defaultBrief = `# Blake Lane — Draft investigation brief\n\nPurpose: Prepare a transportation staff corridor review.\nEvidence basis: Selected observations from the May 30, 2023 community presentation. Historical evidence; current conditions unverified.\n\n## Proposed investigation tasks\n- Revisit accessible paths and vehicle-speed concerns (PDF page 8).\n- Review crossings and transit connections (PDF page 9).\n- Consider a nighttime visibility review (PDF page 11).\n- Confirm the status of improvements listed as upcoming (PDF page 17).\n\n## Records to obtain\n- Final road safety audit and agency responses.\n- Newer implementation records and field observations.\n- Relevant speed, volume, and crash measurements before assessing effects.\n\n## Source\nMay 30, 2023 community presentation:\n${presentation}\nPage numbers refer to physical PDF pages, not printed slide numbers.\n\n## Staff notes\n\n`;
const editor = document.querySelector('#brief-editor');
const storageKey = 'streetlight.brief.v1';
try { editor.value = localStorage.getItem(storageKey) ?? defaultBrief; }
catch { editor.value = defaultBrief; }
function saveBrief() {
  try { localStorage.setItem(storageKey, editor.value); document.querySelector('#save-status').textContent = 'Saved in this browser'; }
  catch { document.querySelector('#save-status').textContent = 'Browser storage unavailable. Export to keep your notes.'; }
}
editor.addEventListener('input', saveBrief);
document.querySelector('#reset').addEventListener('click', () => {
  if (window.confirm('Replace your working notes with the starter brief?')) { editor.value = defaultBrief; saveBrief(); }
});
document.querySelector('#export').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([editor.value], { type: 'text/markdown;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = 'blake-lane-investigation-brief.md';
  document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
});
function selectView(name) {
  document.querySelectorAll('.view').forEach(view => { view.hidden = view.id !== name; });
  document.querySelectorAll('.tab').forEach(tab => {
    const selected = tab.dataset.view === name; tab.classList.toggle('active', selected);
    if (selected) tab.setAttribute('aria-current', 'page'); else tab.removeAttribute('aria-current');
  });
}
document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => selectView(tab.dataset.view)));
function renderEvidence(highlight) {
  const cards = highlight ? evidence.filter(item => item.id === highlight).concat(evidence.filter(item => item.id !== highlight)).slice(0, 3) : evidence.slice(0, 3);
  document.querySelector('#evidence-cards').innerHTML = cards.map(item => `<article class="evidence-card ${item.id === highlight ? 'selected' : ''}" id="evidence-${item.id}"><div class="evidence-label"><span>${item.label}</span><span>P. ${item.page}</span></div><h3>${item.title}</h3><p>${item.text}</p><a href="${presentation}#page=${item.page}" target="_blank" rel="noopener noreferrer">Open original · page ${item.page} ↗</a></article>`).join('');
}
function renderAnswer(key) {
  const answer = answers[key];
  document.querySelector('#answer').innerHTML = `<div class="answer-top"><span>REVIEW ASSISTANT</span><span class="answer-pill">${key === 'unknown' ? 'Outside demo scope' : 'Curated · historical evidence'}</span></div><h2>${answer.title}</h2><p class="answer-intro">${answer.intro}</p>${answer.items.map(([title, text, id], index) => `<div class="answer-item"><span class="item-number">0${index + 1}</span><div><h3>${title}</h3><p>${text}${id ? ` <button class="citation" data-evidence="${id}" aria-label="Show evidence on PDF page ${evidence.find(item => item.id === id).page}">p. ${evidence.find(item => item.id === id).page} ↗</button>` : ''}</p></div></div>`).join('')}<div class="answer-bottom">SOURCE BASIS · May 30, 2023 community presentation<br>Evidence cards are paraphrases. Open the original PDF to inspect the full page. Full audit and page-image verification remain pending.</div>`;
  document.querySelectorAll('.citation').forEach(button => button.addEventListener('click', () => {
    renderEvidence(button.dataset.evidence);
    document.querySelector(`#evidence-${button.dataset.evidence}`).scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  }));
  renderEvidence(key === 'plans' ? 'plans' : null);
}
document.querySelector('#suggestions').innerHTML = prompts.map(([text, key]) => `<button class="suggestion" data-answer="${key}">${text}<span aria-hidden="true">↗</span></button>`).join('');
document.querySelectorAll('.suggestion').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#question').value = prompts.find(item => item[1] === button.dataset.answer)[0]; renderAnswer(button.dataset.answer);
}));
// Deliberately narrow routing: unknown questions must not receive invented answers.
const supportedQuestions = new Map([
  ...prompts.map(([text, key]) => [normalize(text), key]),
  [normalize('What should I review before the next field visit?'), 'overview']
]);
function normalize(text) { return text.toLowerCase().replace(/[?!.]/g, '').replace(/\s+/g, ' ').trim(); }
document.querySelector('#question-form').addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('#question');
  if (!input.value.trim()) { input.focus(); return; }
  renderAnswer(supportedQuestions.get(normalize(input.value)) ?? 'unknown');
});
const sources = [
  ['Community meeting presentation', 'May 30, 2023 · Selected text reviewed · Demo evidence', presentation],
  ['Final road safety audit', 'Listed November 2024 · Not reviewed or included in answers', 'https://www.fairfaxcounty.gov/providence/sites/providence/files/Assets/Documents/Blake%20Lane%20RSA%20Final%20Report_508c.pdf'],
  ['Corridor safety updates', 'County source index · Consult for additional records', 'https://www.fairfaxcounty.gov/providence/blake-lane-corridor-safety-updates']
];
document.querySelector('#source-list').innerHTML = sources.map(([title, note, url]) => `<article class="source-row"><div><h3>${title}</h3><p>${note}</p></div><a href="${url}" target="_blank" rel="noopener noreferrer">Open source ↗</a></article>`).join('');
renderAnswer('overview');
