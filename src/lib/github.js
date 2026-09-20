import fallbackSnapshot from '../content/github-snapshot.json' with { type: 'json' };
import { validateProject } from '../content/projects.registry.js';

const GITHUB_USERNAME = 'Yashwanth-23';
const GITHUB_API_BASE = 'https://api.github.com';
const TIMEOUT_MS = 10000;

/**
 * Filter an object to only whitelisted repository fields.
 */
export function whitelistRepoFields(repo) {
  if (!repo || typeof repo !== 'object') return null;

  return {
    id: repo.id,
    name: typeof repo.name === 'string' ? repo.name : '',
    html_url: typeof repo.html_url === 'string' ? repo.html_url : '',
    description: typeof repo.description === 'string' ? repo.description : '',
    homepage: typeof repo.homepage === 'string' ? repo.homepage : '',
    language: typeof repo.language === 'string' ? repo.language : '',
    topics: Array.isArray(repo.topics) ? repo.topics.map(t => String(t)) : [],
    stargazers_count: typeof repo.stargazers_count === 'number' ? repo.stargazers_count : 0,
    pushed_at: typeof repo.pushed_at === 'string' ? repo.pushed_at : '',
    updated_at: typeof repo.updated_at === 'string' ? repo.updated_at : '',
    fork: Boolean(repo.fork),
    archived: Boolean(repo.archived),
    is_template: Boolean(repo.is_template),
    disabled: Boolean(repo.disabled),
  };
}

/**
 * Eligibility rules:
 * - not a fork
 * - not archived
 * - not a template
 * - not disabled
 * - topics contains exactly 'portfolio'
 */
export function isEligibleRepo(repo) {
  if (!repo || typeof repo !== 'object') return false;

  if (repo.fork === true) return false;
  if (repo.archived === true) return false;
  if (repo.is_template === true) return false;
  if (repo.disabled === true) return false;

  if (!Array.isArray(repo.topics)) return false;
  const hasPortfolioTopic = repo.topics.some(
    (t) => String(t).trim().toLowerCase() === 'portfolio'
  );
  if (!hasPortfolioTopic) return false;

  // Must have a valid https html_url
  if (!repo.html_url || typeof repo.html_url !== 'string' || !repo.html_url.startsWith('https://')) {
    return false;
  }

  return true;
}

/**
 * Normalizes an eligible repository into the standardized project shape.
 * Placement is strictly 'latest' and source is 'github'.
 */
export function normalizeRepoToProject(repo) {
  const links = [
    {
      label: 'Github',
      url: repo.html_url,
    },
  ];

  if (repo.homepage && typeof repo.homepage === 'string' && repo.homepage.startsWith('https://')) {
    links.push({
      label: 'Demo',
      url: repo.homepage,
    });
  }

  const stackParts = [];
  if (repo.language) stackParts.push(repo.language);
  if (Array.isArray(repo.topics)) {
    const otherTopics = repo.topics.filter(t => String(t).toLowerCase() !== 'portfolio');
    if (otherTopics.length > 0) {
      stackParts.push(...otherTopics.slice(0, 3));
    }
  }

  let year = '';
  if (repo.pushed_at) {
    const date = new Date(repo.pushed_at);
    if (!isNaN(date.getTime())) {
      year = String(date.getFullYear());
    }
  }

  const project = {
    id: 'gh-' + String(repo.id || repo.name),
    title: repo.name,
    stack: stackParts.join('   ') || 'Open Source',
    description: repo.description || '',
    year: year || String(new Date().getFullYear()),
    links,
    image: '',
    placement: 'latest',
    source: 'github',
    pushed_at: repo.pushed_at || '',
  };

  return validateProject(project);
}

/**
 * Returns fallback projects from the checked-in snapshot.
 */
export function getFallbackProjects() {
  try {
    if (!Array.isArray(fallbackSnapshot)) return [];
    return fallbackSnapshot
      .map(whitelistRepoFields)
      .filter(isEligibleRepo)
      .map(normalizeRepoToProject)
      .sort((a, b) => (new Date(b.pushed_at || 0).getTime()) - (new Date(a.pushed_at || 0).getTime()));
  } catch (err) {
    console.error('Failed to parse fallback snapshot:', err);
    return [];
  }
}

/**
 * Fetches eligible repositories from GitHub with pagination and error fallback.
 * Uses an optional customFetch for isolated test harness verification.
 */
export async function fetchEligibleRepos({ customFetch = fetch } = {}) {
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'portfolio-sync',
  };

  // Optional server-side GITHUB_TOKEN for higher rate limits. Never leaks to client.
  const token = typeof process !== 'undefined' ? process.env.GITHUB_TOKEN : undefined;
  if (token) {
    headers.Authorization = 'Bearer ' + token;
  }

  const allWhitelistedRepos = [];
  let page = 1;
  const perPage = 100;
  let hasMore = true;

  try {
    while (hasMore) {
      const url = GITHUB_API_BASE + '/users/' + GITHUB_USERNAME + '/repos?per_page=' + perPage + '&page=' + page;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

      const response = await customFetch(url, {
        headers,
        signal: controller.signal,
        next: { revalidate: 21600 }, // 6-hour cache
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn('GitHub API responded with status ' + response.status + '. Falling back to snapshot.');
        return getFallbackProjects();
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        console.warn('GitHub API returned non-array payload. Falling back to snapshot.');
        return getFallbackProjects();
      }

      for (const item of data) {
        const whitelisted = whitelistRepoFields(item);
        if (whitelisted) {
          allWhitelistedRepos.push(whitelisted);
        }
      }

      if (data.length < perPage) {
        hasMore = false;
      } else {
        page += 1;
        // Safety cap on pagination
        if (page > 10) break;
      }
    }

    const eligibleProjects = allWhitelistedRepos
      .filter(isEligibleRepo)
      .map(normalizeRepoToProject)
      .sort((a, b) => (new Date(b.pushed_at || 0).getTime()) - (new Date(a.pushed_at || 0).getTime()));

    return eligibleProjects;
  } catch (error) {
    console.warn('GitHub fetch error, serving checked-in snapshot fallback: ' + error.message);
    return getFallbackProjects();
  }
}
