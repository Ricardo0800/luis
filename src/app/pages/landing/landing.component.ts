import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LEADS_DATA } from '../../data/leads.data';
import { EnrichedLead } from '../../models/lead.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HtmlGeneratorService } from '../../services/html-generator.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    @if (lead()) {
      <div class="fixed top-4 left-4 z-50">
        <a routerLink="/" class="bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full backdrop-blur-sm transition-colors text-sm font-medium flex items-center gap-2">
          ← Voltar para o Hub
        </a>
      </div>
      <div [innerHTML]="htmlContent()"></div>
    } @else {
      <div class="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
        <p>Página não encontrada.</p>
        <a routerLink="/" class="ml-4 text-indigo-600 hover:underline">Voltar</a>
      </div>
    }
  `
})
export class LandingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private htmlGenerator = inject(HtmlGeneratorService);
  private sanitizer = inject(DomSanitizer);

  lead = signal<EnrichedLead | null>(null);
  htmlContent = signal<SafeHtml>('');

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      const found = LEADS_DATA.find(l => l.slug === slug);
      
      if (found) {
        this.lead.set(found);
        const rawHtml = this.htmlGenerator.generate(found);
        this.htmlContent.set(this.sanitizer.bypassSecurityTrustHtml(rawHtml));
      } else {
        this.lead.set(null);
      }
    });
  }
}
