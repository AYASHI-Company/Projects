'use strict';
// All accounts are configured here; visitors never supply handles.
const SCHOLARS = {
  assim: { name: 'Sheikh Assim Al-Hakeem', accounts: {
    youtube: 'https://www.youtube.com/@assimalhakeem',
    instagram: 'https://www.instagram.com/assimalhakeem/',
    facebook: 'https://www.facebook.com/SheikhAssimAlhakeemTeam/'
  } },
  menk: { name: 'Mufti Menk', accounts: {
    youtube: 'https://www.youtube.com/@muftimenkofficial',
    instagram: 'https://www.instagram.com/muftimenkofficial/',
    facebook: 'https://www.facebook.com/muftimenk/'
  } }
};
const PLATFORMS = {
  youtube: { label: 'YouTube', symbol: '▶', description: 'Search videos published on the selected scholar’s YouTube channel.' },
  instagram: { label: 'Instagram', symbol: '◎', description: 'Search publicly indexed posts from the selected scholar’s Instagram page. Some posts may not appear in search engines.' },
  facebook: { label: 'Facebook', symbol: 'f', description: 'Search publicly indexed posts from the selected scholar’s Facebook page. Some posts may not appear in search engines.' }
};
const form = document.getElementById('search-form');
const queryInput = document.getElementById('query');
const errorDisplay = document.getElementById('form-error');
const resultsSection = document.getElementById('results');
const resultCards = document.getElementById('result-cards');
const resultsDescription = document.getElementById('results-description');
const copySearchButton = document.getElementById('copy-search');
const copyStatus = document.getElementById('copy-status');
let lastSearch = null;
function selections() {
  return {
    query: queryInput.value.trim(),
    scholarId: form.querySelector('input[name=scholar]:checked')?.value || '',
    platforms: Array.from(form.querySelectorAll('input[name=platform]:checked')).map(input => input.value)
  };
}
function searchDestination(scholar, platformId, query) {
  const profile = scholar.accounts[platformId];
  if (!profile) return null;
  if (platformId === 'youtube') {
    return `${profile.replace(/\/$/, '')}/search?query=${encodeURIComponent(query)}`;
  }
  // Instagram and Facebook do not provide unauthenticated public profile-post search APIs.
  // A scoped search engine lookup is an honest fallback, not an in-app media retrieval.
  const domainPath = profile.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return `https://www.google.com/search?q=${encodeURIComponent('site:' + domainPath + ' ' + query)}`;
}
function addTextElement(parent, tag, className, value) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = value;
  parent.appendChild(element);
  return element;
}
function makeResultCard(scholar, platformId, query) {
  const platform = PLATFORMS[platformId];
  const profile = scholar.accounts[platformId];
  const destination = searchDestination(scholar, platformId, query);
  if (!platform || !profile || !destination) return null;
  const card = document.createElement('article');
  card.className = 'result-card';
  const top = document.createElement('div');
  top.className = 'result-top';
  addTextElement(top, 'span', `platform-icon ${platformId}`, platform.symbol);
  addTextElement(top, 'span', '', platform.label);
  card.appendChild(top);
  addTextElement(card, 'h3', '', `${scholar.name} on ${platform.label}`);
  addTextElement(card, 'p', '', platform.description);
  addTextElement(card, 'div', 'result-query', `Topic: ${query}`);
  const searchLink = document.createElement('a');
  searchLink.className = 'source-link';
  searchLink.href = destination;
  searchLink.target = '_blank';
  searchLink.rel = 'noopener noreferrer';
  searchLink.textContent = platformId === 'youtube' ? 'Search channel videos ↗' : 'Search indexed posts ↗';
  card.appendChild(searchLink);
  const profileLink = document.createElement('a');
  profileLink.className = 'profile-link';
  profileLink.href = profile;
  profileLink.target = '_blank';
  profileLink.rel = 'noopener noreferrer';
  profileLink.textContent = 'Visit scholar’s page ↗';
  card.appendChild(profileLink);
  return card;
}
function renderSearch(search) {
  const scholar = SCHOLARS[search.scholarId];
  if (!scholar || search.query.length < 3 || search.platforms.length === 0) return;
  resultCards.replaceChildren();
  search.platforms.forEach(platformId => {
    const card = makeResultCard(scholar, platformId, search.query);
    if (card) resultCards.appendChild(card);
  });
  resultsDescription.textContent = `Prepared searches for ${scholar.name} about ${search.query}. Select a platform below to view its matching sources.`;
  resultsSection.hidden = false;
  copyStatus.textContent = '';
  lastSearch = search;
  const url = new URL(window.location.href);
  url.searchParams.set('q', search.query);
  url.searchParams.set('scholar', search.scholarId);
  url.searchParams.set('platforms', search.platforms.join(','));
  window.history.replaceState({}, '', url);
  resultsSection.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
}
form.addEventListener('submit', event => {
  event.preventDefault();
  errorDisplay.hidden = true;
  const search = selections();
  if (search.query.length < 3) {
    errorDisplay.textContent = 'Please enter a question or topic with at least three characters.';
    errorDisplay.hidden = false;
    queryInput.focus();
    return;
  }
  if (!SCHOLARS[search.scholarId]) {
    errorDisplay.textContent = 'Please select one of the listed scholars.';
    errorDisplay.hidden = false;
    return;
  }
  if (!search.platforms.length) {
    errorDisplay.textContent = 'Please select at least one social media platform.';
    errorDisplay.hidden = false;
    return;
  }
  renderSearch(search);
});
document.querySelectorAll('[data-topic]').forEach(button => {
  button.addEventListener('click', () => {
    queryInput.value = button.dataset.topic;
    queryInput.focus();
  });
});
copySearchButton.addEventListener('click', async () => {
  if (!lastSearch) return;
  try {
    await navigator.clipboard.writeText(window.location.href);
    copyStatus.textContent = 'Search link copied.';
  } catch {
    copyStatus.textContent = 'Copy the address from your browser to share this search.';
  }
});
// Restore a shared search while ignoring any unknown scholar or platform values.
const params = new URLSearchParams(window.location.search);
const sharedQuery = params.get('q');
const sharedScholar = params.get('scholar');
const sharedPlatforms = params.get('platforms');
if (sharedQuery && sharedQuery.length >= 3 && sharedQuery.length <= 240 && SCHOLARS[sharedScholar]) {
  queryInput.value = sharedQuery;
  const scholarRadio = form.querySelector(`input[name=scholar][value=${sharedScholar}]`);
  if (scholarRadio) scholarRadio.checked = true;
  if (sharedPlatforms !== null) {
    const allowed = sharedPlatforms.split(',').filter(id => PLATFORMS[id]);
    form.querySelectorAll('input[name=platform]').forEach(input => { input.checked = allowed.includes(input.value); });
  }
  const restored = selections();
  if (restored.platforms.length) renderSearch(restored);
}
