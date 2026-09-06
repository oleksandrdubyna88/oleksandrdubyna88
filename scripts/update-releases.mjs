#!/usr/bin/env node
// Refreshes the "Recent releases" block of README.md (and the full list in releases.md) from the
// public releases of the repositories listed below. Zero dependencies; Node 22+.
//
// Two rules this script exists to enforce:
//   1. Sort by `published_at` yourself. The releases endpoint orders by release CREATION, and on
//      2026-09-06 it returned mcp-v0.17.1 ahead of the actual latest mcp-v0.18.1.
//   2. Never write a partial block. One failed fetch → exit 1 and README.md is left byte-identical.
//
// All five repositories are public, so the workflow's default GITHUB_TOKEN is enough — no PAT.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const OWNER = 'oleksandrdubyna88';
export const REPOS = [
  'dew_flow_connect_other_ais',
  'dew_flow_creds_for_devs',
  'dew_flow_sidecar_rust',
  'dew_flow_benchmark',
  'dew_flow_mcp',
];
export const START = '<!-- releases:start -->';
export const END = '<!-- releases:end -->';
export const LIMIT = 8;

/** Drafts out, newest first. ISO-8601 UTC strings compare correctly as text. */
export function sortReleases(releases) {
  return releases
    .filter((r) => !r.draft)
    .sort((a, b) => b.published_at.localeCompare(a.published_at));
}

/** The README block: the newest `limit` releases across every repository. */
export function render(releases, limit = LIMIT) {
  const rows = sortReleases(releases)
    .slice(0, limit)
    .map((r) => `- [${r.repo} · ${r.tag_name}](${r.html_url}) — ${r.published_at.slice(0, 10)}${r.prerelease ? ' *(pre-release)*' : ''}`);
  return rows.length > 0 ? rows.join('\n') : '- *(no releases yet)*';
}

/** releases.md: every release, grouped by repository in REPOS order, newest first inside a group. */
export function renderFull(releases, repos = REPOS) {
  const sections = repos.map((repo) => {
    const rows = sortReleases(releases.filter((r) => r.repo === repo))
      .map((r) => `- [${r.tag_name}](${r.html_url}) — ${r.published_at.slice(0, 10)}${r.prerelease ? ' *(pre-release)*' : ''}`);
    return `## ${repo}\n\n${rows.length > 0 ? rows.join('\n') : '*(no releases yet)*'}\n`;
  });
  return `# Releases\n\nEvery release across the public repositories, refreshed daily by [a workflow](.github/workflows/update-releases.yml).\n\n${sections.join('\n')}`;
}

/** Replaces only the text between the markers; everything outside is preserved byte-for-byte. */
export function replaceBlock(text, block, start = START, end = END) {
  const i = text.indexOf(start);
  const j = text.indexOf(end);
  if (i < 0 || j < 0 || j < i) throw new Error(`markers ${start} … ${end} not found in order`);
  return `${text.slice(0, i + start.length)}\n${block}\n${text.slice(j)}`;
}

/** The `rel="next"` URL of a GitHub `Link` header, or null on the last page. */
export function nextLink(header) {
  if (!header) return null;
  const next = header.split(',').map((s) => s.trim()).find((s) => /rel="next"/.test(s));
  return next ? next.slice(next.indexOf('<') + 1, next.indexOf('>')) : null;
}

async function fetchReleases(repo, token) {
  const headers = { accept: 'application/vnd.github+json', 'user-agent': `${OWNER}-profile-readme` };
  if (token) headers.authorization = `Bearer ${token}`;
  const out = [];
  let url = `https://api.github.com/repos/${OWNER}/${repo}/releases?per_page=100`;
  while (url) {
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`${repo}: HTTP ${res.status} ${res.statusText}`);
    for (const r of await res.json()) {
      out.push({
        repo,
        tag_name: r.tag_name,
        html_url: r.html_url,
        published_at: r.published_at ?? r.created_at,
        prerelease: Boolean(r.prerelease),
        draft: Boolean(r.draft),
      });
    }
    url = nextLink(res.headers.get('link'));
  }
  return out;
}

async function main() {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  const token = process.env.GITHUB_TOKEN ?? '';
  // Promise.all rejects on the first failure, so nothing below runs on a partial result.
  const releases = (await Promise.all(REPOS.map((repo) => fetchReleases(repo, token)))).flat();

  const readmePath = join(root, 'README.md');
  const before = readFileSync(readmePath, 'utf8');
  const after = replaceBlock(before, render(releases));
  if (after !== before) writeFileSync(readmePath, after);
  writeFileSync(join(root, 'releases.md'), renderFull(releases));

  // Count what was rendered, not what was fetched: an owner's token also sees draft releases, a
  // workflow's token does not, and the two must report the same number for the same block.
  const published = sortReleases(releases);
  const perRepo = REPOS.map((repo) => `${repo}=${published.filter((r) => r.repo === repo).length}`).join(' ');
  console.log(`${published.length} published releases (${perRepo}); README ${after === before ? 'unchanged' : 'updated'}.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
