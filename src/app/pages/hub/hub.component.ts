import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LEADS_DATA } from '../../data/leads.data';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 text-gray-900 font-sans p-8">
      <div class="max-w-6xl mx-auto">
        <header class="mb-12 text-center">
          <h1 class="text-4xl font-bold tracking-tight mb-4">Hub de Landing Pages</h1>
          <p class="text-lg text-gray-600">
            Catálogo de {{ leads.length }} empresas selecionadas e processadas.
          </p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (lead of leads; track lead.slug) {
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                    {{ lead.categoria }}
                  </span>
                  <div class="flex items-center text-amber-500 text-sm font-medium">
                    ★ {{ lead.nota }} <span class="text-gray-400 ml-1">({{ lead.total_avaliacoes }})</span>
                  </div>
                </div>
                
                <h2 class="text-xl font-bold mb-2">{{ lead.nome }}</h2>
                <p class="text-sm text-gray-500 mb-6 line-clamp-2">{{ lead.endereco }}</p>
                
                <a [routerLink]="['/', lead.slug]" 
                   class="block w-full text-center bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors">
                  Ver Landing Page
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class HubComponent {
  leads = LEADS_DATA;
}
