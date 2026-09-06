import { test } from 'node:test';
import assert from 'node:assert/strict';
import { END, START, nextLink, render, renderFull, replaceBlock, sortReleases } from './update-releases.mjs';

// The real order the API returned on 2026-09-06: creation order, with the actual latest release third.
const outOfOrder = [
  { repo: 'dew_flow_connect_other_ais', tag_name: 'mcp-v0.17.1', html_url: 'https://x/17', published_at: '2026-09-05T10:00:00Z', prerelease: false, draft: false },
  { repo: 'dew_flow_connect_other_ais', tag_name: 'mcp-v0.10.0', html_url: 'https://x/10', published_at: '2026-09-02T10:00:00Z', prerelease: false, draft: false },
  { repo: 'dew_flow_connect_other_ais', tag_name: 'mcp-v0.18.1', html_url: 'https://x/18', published_at: '2026-09-06T08:00:00Z', prerelease: false, draft: false },
  { repo: 'dew_flow_creds_for_devs', tag_name: 'cli-v0.1.0', html_url: 'https://x/cli', published_at: '2026-08-26T09:00:00Z', prerelease: false, draft: false },
];

test('sortReleases orders by published_at descending, whatever order the API used', () => {
  assert.deepEqual(sortReleases(outOfOrder).map((r) => r.tag_name), ['mcp-v0.18.1', 'mcp-v0.17.1', 'mcp-v0.10.0', 'cli-v0.1.0']);
});

test('sortReleases drops drafts and does not mutate its input', () => {
  const withDraft = [...outOfOrder, { repo: 'r', tag_name: 'draft', html_url: 'https://x/d', published_at: '2027-01-01T00:00:00Z', prerelease: false, draft: true }];
  const before = JSON.stringify(withDraft);
  assert.ok(!sortReleases(withDraft).some((r) => r.tag_name === 'draft'));
  assert.equal(JSON.stringify(withDraft), before);
});

test('render puts the newest first, formats the date as YYYY-MM-DD and links repo · tag', () => {
  const lines = render(outOfOrder).split('\n');
  assert.equal(lines[0], '- [dew_flow_connect_other_ais · mcp-v0.18.1](https://x/18) — 2026-09-06');
  assert.equal(lines.at(-1), '- [dew_flow_creds_for_devs · cli-v0.1.0](https://x/cli) — 2026-08-26');
});

test('render caps at the limit and marks pre-releases', () => {
  const pre = [{ repo: 'r', tag_name: 'v9-rc1', html_url: 'https://x/rc', published_at: '2026-09-07T00:00:00Z', prerelease: true, draft: false }];
  const lines = render([...outOfOrder, ...pre], 2).split('\n');
  assert.equal(lines.length, 2);
  assert.equal(lines[0], '- [r · v9-rc1](https://x/rc) — 2026-09-07 *(pre-release)*');
});

test('render of nothing is an honest placeholder, not an empty block', () => {
  assert.equal(render([]), '- *(no releases yet)*');
});

test('renderFull groups by repository in the given order and says so when a repository has none', () => {
  const md = renderFull(outOfOrder, ['dew_flow_creds_for_devs', 'dew_flow_mcp', 'dew_flow_connect_other_ais']);
  const headings = md.split('\n').filter((l) => l.startsWith('## '));
  assert.deepEqual(headings, ['## dew_flow_creds_for_devs', '## dew_flow_mcp', '## dew_flow_connect_other_ais']);
  assert.match(md, /## dew_flow_mcp\n\n\*\(no releases yet\)\*/);
  assert.ok(md.indexOf('mcp-v0.18.1') < md.indexOf('mcp-v0.17.1'), 'newest first inside a group');
});

const readme = `# Title\n\nprose that must survive\n\n${START}\n- old line\n${END}\n<sub>footer</sub>\n`;

test('replaceBlock replaces only the text between the markers', () => {
  const out = replaceBlock(readme, '- new line');
  assert.equal(out, `# Title\n\nprose that must survive\n\n${START}\n- new line\n${END}\n<sub>footer</sub>\n`);
});

test('replaceBlock is idempotent', () => {
  const once = replaceBlock(readme, '- new line');
  assert.equal(replaceBlock(once, '- new line'), once);
});

test('replaceBlock refuses a README without both markers in order', () => {
  assert.throws(() => replaceBlock('no markers here', '- x'), /markers/);
  assert.throws(() => replaceBlock(`${END}\n${START}`, '- x'), /markers/);
});

test('nextLink reads rel="next" from a GitHub Link header and is null on the last page', () => {
  const header = '<https://api.github.com/repositories/1/releases?per_page=100&page=2>; rel="next", <https://api.github.com/repositories/1/releases?per_page=100&page=2>; rel="last"';
  assert.equal(nextLink(header), 'https://api.github.com/repositories/1/releases?per_page=100&page=2');
  assert.equal(nextLink('<https://api.github.com/x?page=1>; rel="prev", <https://api.github.com/x?page=1>; rel="first"'), null);
  assert.equal(nextLink(null), null);
});
