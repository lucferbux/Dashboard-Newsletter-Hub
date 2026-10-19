// The page, top to bottom. To add a section: create js/sections/<id>.js exporting
// { id, nav: { group, label, icon }, render(), mount?(el) } and list it here.
import hero from './hero.js';
import about from './about.js';
import metrics from './metrics.js';
import modules from './modules.js';
import integrations from './integrations.js';
import kubeflow from './kubeflow.js';
import architecture from './architecture.js';
import distributions from './distributions.js';
import releases from './releases.js';
import timeline from './timeline.js';
import roadmap from './roadmap.js';
import initiatives from './initiatives.js';
import value from './value.js';

export default [hero, about, metrics, modules, integrations, kubeflow, architecture, distributions, releases, timeline, roadmap, initiatives, value];
