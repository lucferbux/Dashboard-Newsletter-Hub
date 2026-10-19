# Data schema

All site content lives in `js/data/*.js` as plain ES modules (`export default …`). The page is rendered from
these files by `js/components/*.js`; **content changes never touch HTML or CSS**.

Shared conventions

- `icon`: a key of `js/icons.js` (Red Hat UI icon names, see `tools/icons.txt`). Missing icon → add it to
  `tools/icons.txt` and run `node tools/build-icons.mjs`.
- `jira`: array of keys (`'RHAISTRAT-1545'`, `'RHOAIENG-83682'`); rendered as links to `https://redhat.atlassian.net/browse/<KEY>`.
- `status` (everywhere): `'delivered' | 'in-progress' | 'at-risk' | 'planned' | 'exploring' | 'live' | 'coming-soon'`.
- `tone` (optional colour): `'blue' | 'green' | 'orange' | 'red' | 'purple' | 'teal' | 'yellow' | 'grey'`.
- Text fields accept a small HTML subset: `<strong>`, `<em>`, `<code>`, `<a href>`. Keep sentences short.

## site.js
```js
export default {
  team: 'Dashboard Platform Team', short: 'Pewter',
  hero: { eyebrow, title, highlight /* word inside title to accent */, subtitle, ctas: [{ label, href, variant: 'primary'|'secondary', icon? }] },
  stats: [{ value: '7', label: 'Ownership areas' }],
  links: { github, slack, ... },
  footer: [{ label, href }], footerNote?,
  sections?: { <sectionId>: { title, subtitle } },   // copy kept from the old page; renderers use their own headers
};
```

## areas.js — what the team owns (About)
`[{ id, title, icon, summary, points?: [string], jira?: [], href? }]`

## metrics.js — Our impact
`{ cards: [{ value: number, suffix?: '+'|'%', label, description, icon, tone? }], pills: [{ value, label }] }`

## modules.js — RHOAI features enabled by the modular architecture
`[{ id, name, icon, category: 'gen-ai'|'model-lifecycle'|'automl'|'data'|'agents'|'observability'|'workbenches'|'platform',
    status, bff: 'go'|'core'|'proxy'|'none', port?, bffHost?, release?: /* first release it shipped in, e.g. '2.25', '3.4' */, description, jira?: [], repo? }]`
New categories need a label and a colour in `js/sections/modules.js` (CATEGORY, TONE).

## integrations.js — external integrations
`[{ name, icon, pattern: string /* e.g. 'Proxy service, no BFF' */, description, links?: [{ label, href }] }]`

## kubeflow.js
`{ intro, stats: [{ value, label, description }], contributors: [{ name, commits }], insightsUrl,
   projects: [{ name, icon, status, description, repo? }] }`

## architecture.js — one tab per surface
```js
[{ id: 'rhoai', label: 'ODH / RHOAI', intro,
   layers: [{ id, name, owner?: 'pewter'|'platform'|'components'|'openshift', items: [string], itemNotes?: [string], note? }],  // top layer first
   containers?: [{ name, kind: 'pod'|'container'|'deployment'|'service'|'cr', layer?: /* layer id it sits in */, port?, description, features?: [string] }],
   diagrams?: [{ id, title, intro?, layers?: [/* same as above */], cards?: [{ title, description }] }],   // extra stacks under the main one
   facts?: [{ label, value }], jira?: [] }]
```

## distributions.js — the distribution matrix
`{ intro, columns: [string], rows: [{ name, icon, status, cells: [string], jira?: [] }] }`

## releases.js — one entry per RHOAI release (newest last)
```js
[{ version: '3.6', status: 'delivered'|'in-progress', ga: '2026-11-18', title: 'RHOAI 3.6 · Production hardening', theme, summary,
   ticks?: [{ name: 'EA1'|'EA2'|'GA', date: 'YYYY-MM-DD', status, title, description }],   // rendered as a progress stepper
   progress?: { done: number, total: number, label },                                     // optional; default = delivered ticks
   highlights: [{ title, area /* free text, becomes a filter chip */, status, icon?, description, tags?: [string], jira?: [] }],
   unlocks?: { intro, items: [{ title, icon, description }] },
   improvements?: { intro, items: [{ label, before, after }] },                            // "Before → after" table
   partners?: { intro, items: [{ name, role, description }] } }]                           // "Teams we enabled"
```

## timeline.js — Our journey (phases of milestones)
`[{ id, period, title, summary, badge?, open?: boolean, milestones: [{ date, title, description, status?, jira?: [], tag? }] }]`

## initiatives.js — strategies/initiatives in flight
`[{ key /* Jira key */, title, status, release?: '3.6'|'3.7', area, description, epics?: [{ key, title, status }] }]`

## roadmap.js — next release exploration (3.7+)
`{ release: '3.7', disclaimer, themes: [{ id, title, icon, tone, owner: 'pewter'|'oversight'|'shared', summary, jira?: [] /* parent */, items: [{ title, status, jira?: [], description? }] }] }`
`owner`: `pewter` = we lead and build it · `oversight` = we planned it and oversee it, another team builds it · `shared` = another team owns it, our platform enables it.
The release explorer shows these themes as a final "exploring" tab; when items get a Fix Version, move them into `releases.js`.

## value.js — Strategic value
`[{ title, icon, description, points?: [string] }]`
