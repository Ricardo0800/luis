import { RenderMode, ServerRoute } from '@angular/ssr';
import { LEADS_DATA } from './data/leads.data';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return LEADS_DATA.map(lead => ({ slug: lead.slug }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
