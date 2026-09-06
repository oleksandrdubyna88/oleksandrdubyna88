# PLAN — a profile README that sells a systems architect, with the receipts attached

> Status: **implemented locally, 2026-09-06 — the workflow's first run on GitHub is the remaining
> verification; promotion to `research/` follows it.** Scope: `README.md`,
> `.github/workflows/update-releases.yml`, `scripts/update-releases.mjs` (+ its test), and the GitHub profile
> surface (repo descriptions, topics, pins, bio, display name). No product code is touched.
>
> Verified against the code on 2026-09-06: three read-only explorations of the `dew_flow_*` repos, both
> Marketplace listings fetched live, 24 competitor profile READMEs sampled. Every number below names the
> file it came from; a number without a file does not go into the README.

## The symptom

`github.com/oleksandrdubyna88` today, as a stranger sees it:

| Surface | State on 2026-09-06 |
|---|---|
| Display name | `Jinx was here` — the person's name appears nowhere |
| Bio | `AI and .NET Technical Lead • Software Innovator • Inventor` — two self-labels no credible profile uses |
| Website / blog | empty |
| Pinned repositories | **none** |
| Profile README | repo exists, **zero commits** |
| The six public `dew_flow_*` repos | **every description empty, zero topics** — a pinned card would render blank under its name |
| Repo age | created 2026-08-14 → 08-31; 293 and 593 commits, 88 and 89 release tags in that window |
| Marketplace | both extensions live: `remsoftdev.connect-other-ais` 0.30.3 (6 installs, 5★/1), `remsoftdev.creds-for-devs` 0.99.1 (9 installs, 5★/2) |

The work is real — two shipped products, a Rust GPU service, a measurement harness with results that
refuted its own author — and none of it is visible from the door. Meanwhile the draft template that
started this task carried six claims the code does not support (a "2x" that is 1.17× for one of three
models; "zero open ports" one shipped HTTPS server away from false; "~3 MB" for a 6.8 MB binary;
"zero-knowledge" where the product says "zero-trust"; Neo4j/Qdrant from a **private** repo; and a
tech-badge row the same advice calls childish).

## What was decided (2026-09-06, with the person)

| Decision | Answer |
|---|---|
| Identity | H1 = **Oleksandr Dubyna**; *Jinx was here* stays as the tagline. Display name changes to match. |
| Audience | **Hybrid** — founders/hiring managers *and* engineers who might install. Footer carries both CTAs. |
| Contact | `oleksandrdubyna88@gmail.com` · `https://t.me/sashnetdev`. No LinkedIn. |
| Numbers | **Measured numbers with their sample sizes** — always. It is the differentiator, not a caveat. |
| Private work | `dew_flow_rag_qln` gets **one line marked `[private]`** with volumes (10k+ files, 52k members). |
| Automation | **Yes**: a daily GitHub Action refreshes a *Recent releases* block from the five public repos. |
| Pins | **Five**: `connect_other_ais`, `creds_for_devs`, `sidecar_rust`, `benchmark`, `mcp` — *after* descriptions and topics are set. `conventions` is **not** pinned (still gets a description). |
| Tone | Lively, sarcastic, uncompromising. The name goes corporate; the voice does not. |
| `gh` | Permitted for the profile surface changes. Pushing the README is confirmed before it happens. |

## What the credible profiles in this niche actually do (measured, 24 fetched)

| Who | Bytes | Tech badges | Stats widget | Shape |
|---|---|---|---|---|
| jonhoo (Principal, Helsing) | 1 002 | 0 | no | three prose paragraphs, "see pinned repos" |
| fasterthanlime | 1 923 | 0 | no | project list: **name — one concrete decision — why it matters** |
| jlowin (FastMCP) | 898 | 0 | no | "you might know me from" + `$ whoami` |
| jxnl (OpenAI) | 996 | 0 | no | role · flagship + external validation · where I write |
| simonw | ~3 000 | 1 (CI) | no | **GitHub Action** regenerates releases / blog / TIL |
| steipete (387k★) | 15 420 | 15 | graph | "Start Here" top-7 *with star counts* — earned by scale |
| davidfowl, mitchellh, DamianEdwards, jbogard | — | — | — | no profile README at all |
| DenverCoder1 / swyxio | 20–31 KB | 26–64 | yes | the generator look |

Rules taken from that table: prose over badges; a flagship line is *mechanism + measured consequence*;
counts appear only when large (nobody under ~1k★ shows them); no `github-readme-stats`; an auto-updated
release feed says "ships continuously" without saying it; 1–4 KB of visible text.

## The README — section by section

Vertical layout (GitHub does not reflow `<table>` on mobile). Target ≤ 4.5 KB of hand-written text
before the generated block. English only.

### 1. Header

```
# Oleksandr Dubyna
*Jinx was here.*

Systems architect. I build the tooling that makes AI coding agents safe to let loose — review gates
run by other vendors' models, a credential broker that never hands over a credential, retrieval
engines that ship with their measurements. .NET 10 Native AOT, Rust, TypeScript. Spain.
```

Badges: **exactly two**, both evidence rather than decoration — the Marketplace *version* badge of each
extension (`img.shields.io/visual-studio-marketplace/v/remsoftdev.<id>`). No install counts, no stars,
no language badges.

### 2. The two flagships

Each: bold linked name · one-line install · the insight in one sentence · 2–3 mechanism bullets · **one
measured line with its N**. Tone anchors come from the repos' own text, which is already sharper than
any marketing paraphrase.

**ConnectOtherAIs** — `code --install-extension remsoftdev.connect-other-ais`

- Insight (repo's own words, [README.md:8-9](https://github.com/oleksandrdubyna88/dew_flow_connect_other_ais/blob/main/README.md)):
  *"The value is not 'more review'. It is review by a model that cannot see the author's reasoning."*
- Mechanism: a Native-AOT MCP server over stdio; the **plan is gated before the code is written** —
  `review_code` refuses until a plan round reached `proceed`: *"skipped stages are impossible, not
  discouraged"*; reviewers are Codex, Antigravity (Gemini), a second Claude, DeepSeek through an
  OpenAI-compatible endpoint, and optionally a local model over Ollama/vLLM; findings de-duplicated
  (same file, ±5 lines, same remark → one) and gated per role; every accept/reject with its reason
  lands in a local SQLite — *the shape of your own AI's blind spots*.
- Measured: *taking the repository checkout away made every hosted model find **more** useful defects —
  4→8, 6→10, 6→7 — at a half to a third of the input tokens, with no wrong finding from any of the
  three.* **One commit, three hosted models, 19 findings, each judged by reading the code it cites.**
  → `research/RESULTS_findings_that_are_worth_something.md:48-61`
- Second receipt: *the gate reviewed itself and found nine real defects; all fixed, every fix watched
  fail first.* → same file, lines 99-121.

**CredsForDevs** — `code --install-extension remsoftdev.creds-for-devs`

- Insight ([README.md:26](https://github.com/oleksandrdubyna88/dew_flow_creds_for_devs/blob/main/README.md)):
  *"The server cannot read anything it stores."*
- Mechanism: secrets in the OS keychain; AES-256-GCM under a random 256-bit master key (HKDF), scrypt
  `N=2¹⁷` only wraps the PIN (`src_vs_code/src/cryptoUtils.ts`); the self-hosted server holds
  ciphertext and *has no code path that could acquire a key*; an AI agent gets a **capability token,
  never a credential** — the broker's response protocol has **no field a secret could occupy**
  (`brokerProtocol.ts:7-10`, a type-level fact, not a policy), and every call still asks the human in
  the editor; a six-switch access ladder, off by default, where "may edit but not view" is
  unrepresentable (`mcpAccess.ts:121-142`).
- Sizes, stated honestly: single-binary Native AOT CLI — **6.8 MB on disk, 2.3–3.1 MB compressed**
  (`research/README.md:61`); server image **50 MB**, chiseled, no shell (`module_server.md:873-880`).
- Receipt: **zero runtime dependencies** in the extension — *"survived a YAML/TOML/INI validator, a
  Shamir split, an SSH agent and a QR decoder — each of which had an obvious package and was written
  instead"* (`module_extension.md:3-5`); dated security reviews that found and fixed a real HIGH
  (`research/SECURITY_REVIEW_2026-08-27.md`).

### 3. Measured, not assumed

The section no competitor profile has. Four or five refuted intuitions, each one line + the lesson +
a link to the public file:

| Intuition | What the measurement said | Source (public) |
|---|---|---|
| A narrower sweep finds the best setting | Reranker pool **20 beat 50** on 50 tasks (32 vs 29 matched); the full set — 64 tasks, 182 expectations — **reversed it, 88 vs 80**. A sweep manufactures winners. | `dew_flow_benchmark/research/MEASURED_LESSONS.md:23-24` |
| More tools help more than better wording | Rewriting **one** instruction moved the score **16.5 of 63**; swapping the toolbox from 4 to 18 tools moved it **1**. | `dew_flow_mcp/research/architecture.md:141-142` |
| The wire is free | The same four tools scored **4 of 63 over MCP** against **36 of 63 in-process**; replicated at sixteen tools, 4/47 vs 11/47. | `dew_flow_benchmark/research/architecture.md:147-148` |
| A model can grade its own work | Two arbiters, six answers: the independent one passed **0 of 6**, the self-judging one **6 of 6**. | `dew_flow_benchmark/research/MEASURED_LESSONS.md:199-215` |
| Cosine 1.0 means identical bytes | On an R9700 through DirectML: cosine **1.000000000** and yet **1012 of 1024 elements differ**, max delta 2.868e-07. | `dew_flow_sidecar_rust/README.md:376-378` |
| A smaller `limit` is a free saving | Dropping a result limit from 20 to 5 lost **29 %** of the ground truth while r@1 and r@3 stayed identical — invisible in any single call. | `dew_flow_mcp/README.md:57-59` |

Pick five at implementation; the sixth is a spare. Every line number is re-verified against the
public `main` before publishing (the private checkout may be ahead of the pushed branch).

### 4. Also public

One tight paragraph each, fasterthanlime-style — the concrete decision, not the category:

- **dew_flow_sidecar_rust** — a single-binary Rust embedding + reranking service (BGE-M3 dense+sparse
  in one forward pass, bge-reranker-v2-m3) on whatever GPU is present: DirectML, CUDA, MIGraphX/ROCm,
  CPU as compile-time features; a wedge detector for the forward pass ONNX Runtime cannot cancel; a
  cosine canary that gates every freshly compiled engine because a crash mid-compile leaves a cache
  that loads fine and answers wrong. 18 modules, none over 800 lines.
- **dew_flow_benchmark** — *measure any code repository, at any commit, through any retrieval engine —
  and get an answer that survives being asked ten thousand times.* Selection/held-out split baked into
  the contract; a delivered-work score that pays nothing for padding a diff; one wall-clock budget per
  leg, because a per-call timeout under a 25-turn agent loop is 4 h 10 m of one leg.
- **dew_flow_mcp** — one tool catalog over stdio and HTTP/SSE, plus a bridge that hands the same tools
  to a local LLM in-process. The public repo cannot know retrieval exists — architecture tests on
  **both** sides of the boundary enforce it. Tool descriptions are runtime configuration, because
  wording turned out to be the biggest lever in the system (see above).
- **dew_flow_conventions** — one copy of every cross-repository rule for AI-agent sessions, mounted as
  a git submodule in five repos; CI fails when a consumer's pin is behind. Discovered the hard way: an
  audit found three consumers two commits behind and one missing a rule entirely.
- **dew_flow_rag_qln `[private]`** — the retrieval product behind the above: a .NET 10 daemon indexing
  C# repositories into Postgres + Qdrant + Neo4j with RRF / weighted fusion and a cross-encoder rerank.
  Indexed `dotnet/aspnetcore`: **10,813 files, 52,545 members, 76,137 points, 16,223 types / 59,401
  edges** — full pass 18 min 39 s, incremental repeat 8 s. *(Numbers from its architecture doc; the
  repository is not public.)*

### 5. Recent releases *(generated)*

```
<!-- releases:start -->
- [dew_flow_connect_other_ais · mcp-v0.18.1](…) — 2026-09-06
- …
<!-- releases:end -->
<sub>Refreshed daily by <a href="…/.github/workflows/update-releases.yml">a workflow in this repo</a>.</sub>
```

Eight newest releases across the five public repos, sorted by `published_at` descending. Answers the
"created three weeks ago" objection with 177 tags of shipping.

### 6. Reach me

Hybrid CTA, one line each, with edge: *Install them, break them, tell me what you found. Or hire me to
build the next one.* — `oleksandrdubyna88@gmail.com` · Telegram `@sashnetdev` · Spain.

### Tone anchors (so the corporate name does not flatten the voice)

- *"Skipped stages are impossible, not discouraged."*
- *"The server cannot read anything it stores."*
- *"A sweep manufactures winners."*
- *"If a CLI needs a 200 MB runtime to bridge IPC, the architecture failed."*
- *"Every number here carries its sample size — including the ones that refuted me."*

## The automation — three shapes considered

| Shape | What | Verdict |
|---|---|---|
| A. Static README | hand-written only | rejected by decision: leaves the "3-week-old repos" objection unanswered |
| **B. Marker block + daily Action** | hand-written copy untouched; only the text between `<!-- releases:start/end -->` is regenerated by a zero-dependency Node script | **chosen** — smallest moving part, the copy stays a document |
| C. Fully templated README | the Action renders the whole README from a template (could also pull Marketplace versions) | rejected for now: every copy edit goes through the template, and a template bug takes the profile down |

### Spec — `scripts/update-releases.mjs` (zero dependencies, Node 22 on the runner)

- `REPOS` = the five public repos, a constant at the top of the file.
- For each: `GET /repos/oleksandrdubyna88/{repo}/releases?per_page=100`, paginated by `Link` header,
  `Authorization: Bearer $GITHUB_TOKEN` when present. **All five repos are public — the default workflow
  token reads them; no PAT.** Budget: ≤ 10 requests per day.
- Drop drafts; keep pre-releases but mark them. **Sort by `published_at` yourself** — measured today:
  the endpoint returned `mcp-v0.17.1` before the actual latest `mcp-v0.18.1` (it orders by release
  creation, not publication). Take the newest 8.
- Render `- [repo · tag](html_url) — YYYY-MM-DD` and replace the text between the markers. Also write
  `releases.md` with the full per-repo list (the simonw pattern) so the README block can stay short.
- **Never write a partial block**: any fetch failure → exit 1, README untouched, the run shows red.
  Missing markers → exit 1. A repo with zero releases is not an error (mcp and benchmark today).
- Pure functions `render(releases)` and `replaceBlock(readme, block)` exported for the test.

### Spec — `.github/workflows/update-releases.yml`

- `on: schedule: [{cron: '23 5 * * *'}]` (once a day, off the hour) + `workflow_dispatch`.
- `permissions: { contents: write }` — write access to **this** repo only.
- Steps: checkout → `node scripts/update-releases.mjs` → `git diff --quiet && exit 0` → commit as
  `github-actions[bot]` → push. **Commits by the bot do not appear on the person's contribution graph;
  a day with no new release produces no commit.**

### Tests — `scripts/update-releases.test.mjs` (`node --test`, zero dependencies)

- `render` orders by `published_at` desc regardless of input order (fixture: the real out-of-order
  API sample from 2026-09-06), caps at 8, marks pre-releases, formats the date as `YYYY-MM-DD`.
- `replaceBlock` replaces only the text between the markers, preserves everything outside byte-for-byte,
  is idempotent, and throws when a marker is missing.
- The CI job runs the tests before the script on every scheduled run.

## Phase 0 — the profile surface (`gh`, permitted)

Descriptions ≤ 350 chars, topics lowercase-hyphenated ≤ 20 each; the texts are the repos' own
one-liners, shortened:

| Repo | Description | Topics |
|---|---|---|
| `dew_flow_connect_other_ais` | Multi-model review gate for AI coding agents: other vendors' models review the plan before it is built and the diff after, over MCP. Native-AOT server + VS Code extension. | mcp, code-review, ai-agents, claude-code, codex, gemini, vscode-extension, dotnet, native-aot, csharp |
| `dew_flow_creds_for_devs` | Zero-trust credential manager for developers, in VS Code: SSH, VPN, databases and keys in the OS keychain; end-to-end encrypted team sync to a server that cannot read what it stores; AI agents use credentials they never receive. | credentials, secrets-management, vscode-extension, zero-trust, mcp, ssh, end-to-end-encryption, dotnet, native-aot, typescript |
| `dew_flow_sidecar_rust` | Single-binary Rust embedding and reranking service (BGE-M3, bge-reranker-v2-m3) on the GPU that is present: DirectML, CUDA, MIGraphX or CPU as compile-time features. | rust, onnx-runtime, embeddings, reranking, bge-m3, directml, migraphx, gpu, axum |
| `dew_flow_benchmark` | Measure any code repository, at any commit, through any retrieval engine — with the sample sizes attached. | benchmark, rag, retrieval, evaluation, dotnet, code-search, mcp |
| `dew_flow_mcp` | A Model Context Protocol server: one tool catalog over stdio and HTTP/SSE, plus a bridge that hands the same tools to a local LLM in-process. | mcp, model-context-protocol, dotnet, csharp, stdio, sse, ollama |
| `dew_flow_conventions` | One copy of every cross-repository rule for AI-agent sessions, mounted as a git submodule in five repos and enforced by CI pin checks. | claude-code, conventions, git-submodule, ci, engineering-practices |

Profile fields (`gh api -X PATCH /user`): `name` → `Oleksandr Dubyna`; `bio` (≤ 160 chars) →
`Systems architect · Native-AOT .NET & Rust · review gates and credential brokers for AI coding agents · every number ships with its sample size` (146 chars, measured); `blog` → `https://t.me/sashnetdev`.
Both Marketplace version badges verified to resolve (HTTP 200) on 2026-09-06.

Pins: five, in this order — `connect_other_ais`, `creds_for_devs`, `sidecar_rust`, `benchmark`, `mcp`.
**Manual step**: checked 2026-09-06 — the GraphQL schema has no mutation for profile pins (only
`pinIssue`, `pinIssueComment`, `pinEnvironment`), so this is done once by hand on the profile page
("Customize your pins") after the descriptions and topics are in place.

## Build order

1. **Phase 0** — descriptions, topics, display name, bio, blog via `gh`. Verify with `gh repo view`.
2. `scripts/update-releases.mjs` + `scripts/update-releases.test.mjs`; run `node --test scripts/` locally;
   run the script locally against the live API and eyeball the block.
3. `.github/workflows/update-releases.yml`.
4. `README.md` to the structure above; every number copied from the ledger, every link absolute.
5. **Verification** (below). Then the screenshot, if provided: `assets/coai-rounds.png`, referenced with
   a plain `<img>` (it is a dark-theme capture; it reads fine on both themes) — **cropped or redacted**:
   the current capture shows `creds_corp`, a non-public repository name, plus branch names and costs.
6. Commit (message per the family's `common/git-workflow.md`, read first) and — **after confirmation** —
   push to `main`; trigger the workflow once by `workflow_dispatch`; confirm the block filled and that
   a second run makes no commit.
7. Pin the five repositories. Move this plan to `research/` with `IMPLEMENTED 2026-09-xx` and the
   deviations recorded.

## Test plan

- `node --test scripts/` green locally and in the workflow.
- The script against the live API: 3 repos with releases, 2 without, no error; block sorted by date.
- A forced failure (bad repo name) exits 1 and leaves `README.md` byte-identical.
- Every number in the README traced to `file:line` on the **public** `main` of its repo (the ledger
  above, re-checked after push — the local checkouts may be ahead of `origin`).
- Both Marketplace ids resolve (`remsoftdev.connect-other-ais`, `remsoftdev.creds-for-devs`) and both
  version badges render.
- Read cold on github.com in light and dark theme and at a phone width: name, what, why, install,
  contact — all on the first screen.
- Nothing in the README is contradicted by the flagship's own README plan
  (`dew_flow_connect_other_ais/todo/PLAN_readme_that_sells.md`): no "2x", no unqualified "zero ports",
  no vendor-overlap figure until `RESULTS_vendor_overlap_*.md` actually lands in `research/`.

## Definition of Done

- [ ] Display name, bio, blog set; six repos carry a description and topics; five are pinned.
- [ ] `README.md` follows the six sections; ≤ 4.5 KB hand-written; two evidence badges, no stack badges.
- [ ] Every number carries its sample size and traces to a public `file:line`; the private repo's line is marked `[private]`.
- [ ] The releases block is filled by a workflow run; a no-change run produces no commit; the bot, not the person, authors the commits.
- [ ] Tests exist for the script's two pure functions and pass in CI.
- [ ] The screenshot, if included, exposes no non-public repository name.
- [ ] This plan lives in `research/` with `IMPLEMENTED` and its deviations.

## Open items for the person

1. The screenshot file — drop `coai-rounds.png` into `assets/` (cropped/redacted as above) or say "no screenshot for v1".
2. LinkedIn was not mentioned — assumed **none** on purpose.
