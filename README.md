# Dashboard Platform Team — showcase site

The public overview of the **RHOAI Dashboard Platform Team (Pewter)**: what we own, what we enable, how it is built,
what each release delivered and what we are exploring next. We use it to present our progress to other organizations.

**Live:** https://lucferbux.github.io/Monarch-Overview/ (GitHub Pages, `main` branch, repo root).

It is built with **PatternFly 6** — the same design system, Red Hat UI icons and page layout as the Red Hat OpenShift AI
dashboard — and has three interactive 3D dioramas (three.js). There is **no build step**: plain HTML, CSS and ES modules.

## Run it locally

```bash
python3 -m http.server 8000      # then open http://localhost:8000
```

ES modules need a server; opening `index.html` from disk will not work.

## How it is organized

```
index.html              Page shell only: PatternFly CSS (pinned CDN), import map for three.js, empty masthead/sidebar/main.
css/site.css            Site layer on top of PatternFly. Uses only PatternFly tokens (--pf-t--*), prefix mo-.
js/app.js               Renders masthead, grouped sidebar nav, every section and the footer; theme switch, scroll-spy, reveals.
js/data/*.js            ALL CONTENT. One file per topic. Schema: js/data/SCHEMA.md.
js/sections/*.js        One renderer per section: { id, nav: { group, label, icon }, render(), mount?(el) }.
js/sections/index.js    The page order. Add or reorder sections here.
js/components/ui.js     PatternFly building blocks as HTML helpers: card, label, statusLabel, tabs, progress, stepper, …
js/icons.js             GENERATED Red Hat UI icon paths. Edit tools/icons.txt, then `node tools/build-icons.mjs`.
js/scenes/*.js          3D dioramas. kit.js = shared three.js helpers; mount.js = lazy loading + theme rebuilds.
tools/                  build-icons.mjs + icons.txt.
assets/                 favicon.
```

### Sections (top to bottom)

| Nav group | Section (`id`) | Data | What it shows |
|---|---|---|---|
| Overview | `hero` | `site.js` | Banner, 3D platform stack (our layer highlighted), headline stats |
| | `about` | `areas.js` | The 7 ownership areas |
| | `metrics` | `metrics.js` | Animated impact metrics and pills |
| What we enable | `modules` | `modules.js` | Module catalog with filters, like RHOAI's model catalog |
| | `integrations` | `integrations.js` | Third-party integrations (Perses, MLflow) |
| | `kubeflow` | `kubeflow.js` | Upstream contributions and contributors |
| How it is built | `architecture` | `architecture.js` | Tabs per surface (RHOAI / MaaS / xKS) + 3D Module Federation |
| | `distributions` | `distributions.js` | 3D "one codebase, three products" + the distribution matrix |
| Releases | `releases` | `releases.js` + `roadmap.js` | Release explorer: one tab per release, stepper EA1→EA2→GA, highlights, before/after |
| | `timeline` | `timeline.js` | Our journey: phases with expandable milestones |
| What is next | `roadmap` | `roadmap.js` | Next-release exploration by theme, with Jira candidates |
| | `initiatives` | `initiatives.js` | Strategies and initiatives in flight |
| | `value` | `value.js` | Strategic value |

## Common changes

After any change run `node tools/check.mjs` (validates data, icons, statuses, Jira keys and section wiring) and look at
the page locally in light, dark and Felt.


- **Update content** (new release highlight, metric, module, milestone): edit the matching `js/data/*.js` file. Never
  put content in HTML.
- **New release**: append an object to `js/data/releases.js` (status `in-progress`, ticks EA1/EA2/GA). When it ships,
  set `status: 'delivered'` and every tick to `delivered`. Start the next one in `js/data/roadmap.js`.
- **New icon**: add its name to `tools/icons.txt` (Red Hat UI names without `rh-ui-`; FontAwesome/PF names with `pf:`),
  run `node tools/build-icons.mjs`, commit `js/icons.js`.
- **New section**: create `js/sections/<id>.js`, register it in `js/sections/index.js`, add its data file and document
  it in `js/data/SCHEMA.md` and in the table above.
- **New 3D diorama**: create `js/scenes/<name>.js` (default export `(el) => stage`, built with `kit.js`), register it in
  `js/scenes/mount.js`, and place `<div class="mo-diorama" data-scene="<name>"></div>` in a section.

## Design rules

- PatternFly first: use `pf-v6-c-*` components through `js/components/ui.js`; add custom CSS only when PatternFly has
  no component for it, with the `mo-` prefix and PatternFly tokens only. That keeps light, dark and Felt themes working.
- Icons are Red Hat UI icons (what the RHOAI nav uses). No emoji, no letter avatars.
- Hide/show with the `hidden` attribute (a global `[hidden]` rule beats PatternFly's `display`).
- Status always through `statusLabel(status)`: `delivered`, `live`, `in-progress`, `at-risk`, `planned`, `exploring`,
  `coming-soon`.
- Jira references are keys in `jira: []`; they render as links to `redhat.atlassian.net`.
- The site is public: only team-shareable facts (Jira, public repos, team docs). No customer names, no confidential
  strategy.

## Upgrading PatternFly

Bump the version in both `index.html` (two `<link>`s) and `tools/build-icons.mjs` (`VERSION`), run
`node tools/build-icons.mjs`, and check the page in light, dark and Felt.
