import {
  isEligibleRepo,
  whitelistRepoFields,
  normalizeRepoToProject,
  fetchEligibleRepos,
} from '../src/lib/github.js';
import { editorialProjects } from '../src/content/projects.registry.js';

let failed = false;
function assert(condition, msg) {
  if (!condition) {
    console.error('FAIL: ' + msg);
    failed = true;
  } else {
    console.log('PASS: ' + msg);
  }
}

async function runSuite() {
  console.log('=== Round 1 Sync & Filter Verification Suite ===\n');

  // 1. Admission Filter Tests
  console.log('1. Admission filter testing:');
  const forkWithTag = { name: 'fork-repo', fork: true, archived: false, is_template: false, disabled: false, topics: ['portfolio'], html_url: 'https://github.com/Yashwanth-23/fork-repo' };
  const archivedWithTag = { name: 'archived-repo', fork: false, archived: true, is_template: false, disabled: false, topics: ['portfolio'], html_url: 'https://github.com/Yashwanth-23/archived-repo' };
  const templateWithTag = { name: 'template-repo', fork: false, archived: false, is_template: true, disabled: false, topics: ['portfolio'], html_url: 'https://github.com/Yashwanth-23/template-repo' };
  const disabledWithTag = { name: 'disabled-repo', fork: false, archived: false, is_template: false, disabled: true, topics: ['portfolio'], html_url: 'https://github.com/Yashwanth-23/disabled-repo' };
  const untaggedRepo = { name: 'untagged-repo', fork: false, archived: false, is_template: false, disabled: false, topics: ['ai', 'python'], html_url: 'https://github.com/Yashwanth-23/untagged-repo' };
  const eligibleRepo = { name: 'eligible-repo', fork: false, archived: false, is_template: false, disabled: false, topics: ['portfolio', 'python'], html_url: 'https://github.com/Yashwanth-23/eligible-repo' };

  assert(isEligibleRepo(forkWithTag) === false, 'Fork with portfolio topic is REJECTED');
  assert(isEligibleRepo(archivedWithTag) === false, 'Archived repo with portfolio topic is REJECTED');
  assert(isEligibleRepo(templateWithTag) === false, 'Template repo with portfolio topic is REJECTED');
  assert(isEligibleRepo(disabledWithTag) === false, 'Disabled repo with portfolio topic is REJECTED');
  assert(isEligibleRepo(untaggedRepo) === false, 'Untagged normal repo is REJECTED');
  assert(isEligibleRepo(eligibleRepo) === true, 'Eligible normal repo with portfolio topic is ADMITTED');

  // 2. Normalization & Shape Verification
  console.log('\n2. Normalization & Shape Verification:');
  const normalized = normalizeRepoToProject(eligibleRepo);
  assert(normalized.placement === 'latest', 'GitHub repo has placement "latest"');
  assert(normalized.source === 'github', 'GitHub repo has source "github"');
  assert(normalized.links.length >= 1 && normalized.links[0].url === 'https://github.com/Yashwanth-23/eligible-repo', 'GitHub link formatted correctly');

  // 3. Fallback Behavior on Simulated Failure
  console.log('\n3. Fallback Behavior on Simulated Failure:');
  const failingFetch = async () => { throw new Error('Simulated network failure'); };
  const fallbackResult = await fetchEligibleRepos({ customFetch: failingFetch });
  assert(Array.isArray(fallbackResult), 'Fallback returned an array from snapshot');

  // 4. Pagination & Malformed Response Handling
  console.log('\n4. Pagination & Malformed Response Handling:');
  const malformedFetch = async () => ({
    ok: true,
    json: async () => ({ error: 'Not an array' }),
  });
  const malformedResult = await fetchEligibleRepos({ customFetch: malformedFetch });
  assert(Array.isArray(malformedResult), 'Malformed non-array response handled safely');

  const http500Fetch = async () => ({
    ok: false,
    status: 500,
    json: async () => ({ message: 'Server Error' }),
  });
  const http500Result = await fetchEligibleRepos({ customFetch: http500Fetch });
  assert(Array.isArray(http500Result), 'HTTP 500 status handled safely via snapshot fallback');

  // 5. Editorial Precedence
  console.log('\n5. Editorial Precedence:');
  const featured = editorialProjects.filter(p => p.placement === 'featured');
  assert(featured.every(p => p.source === 'editorial'), 'All featured projects have source "editorial"');
  assert(normalized.placement !== 'featured', 'GitHub admitted repos never gain "featured" placement');

  // 6. Live API Query
  console.log('\n6. Live API Query:');
  const liveResult = await fetchEligibleRepos();
  console.log('Live eligible count:', liveResult.length);
  assert(liveResult.length === 0, 'Zero repositories currently admitted from live GitHub (none tagged "portfolio")');

  if (failed) {
    console.error('\nVerification suite FAILED');
    process.exit(1);
  } else {
    console.log('\nAll verification suite assertions PASSED');
  }
}

runSuite().catch((err) => {
  console.error(err);
  process.exit(1);
});
