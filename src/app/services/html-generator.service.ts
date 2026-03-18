import { Injectable } from '@angular/core';
import { EnrichedLead } from '../models/lead.model';

@Injectable({ providedIn: 'root' })
export class HtmlGeneratorService {
  generate(lead: EnrichedLead): string {
    const cleanPhone = lead.telefone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=Ol%C3%A1,%20vim%20pela%20p%C3%A1gina%20e%20gostaria%20de%20saber%20mais`;

    let borderRadius = '8px';
    let fontFamily = "'Inter', sans-serif";
    
    if (lead.estilo_visual === 'premium') {
      borderRadius = '4px';
    } else if (lead.estilo_visual === 'industrial') {
      borderRadius = '0px';
      fontFamily = "'Space Grotesk', sans-serif";
    }

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lead.nome} | ${lead.categoria}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: ${lead.cores.primary};
            --secondary: ${lead.cores.secondary};
            --bg: ${lead.cores.background};
            --text: ${lead.cores.text};
            --surface: #ffffff;
            --surface-alt: #f9fafb;
            --border: #e5e7eb;
            --radius: ${borderRadius};
            --font-main: ${fontFamily};
        }
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: var(--font-main);
            background-color: var(--bg);
            color: var(--text);
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        img, svg { max-width: 100%; height: auto; display: block; }
        a { text-decoration: none; color: inherit; }

        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
        }

        section { padding: 96px 0; }

        /* Typography */
        h1, h2, h3, h4 { color: var(--text); }
        h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; line-height: 1.1; margin-bottom: 24px; letter-spacing: -0.03em; }
        h2 { font-size: clamp(2rem, 4vw, 2.5rem); font-weight: 600; line-height: 1.2; margin-bottom: 16px; letter-spacing: -0.02em; }
        h3 { font-size: 1.25rem; font-weight: 600; margin-bottom: 12px; letter-spacing: -0.01em; }
        p { font-size: 1.125rem; margin-bottom: 24px; opacity: 0.8; }
        
        /* Buttons */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 16px 32px;
            font-size: 1rem;
            font-weight: 600;
            border-radius: var(--radius);
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
            text-align: center;
            gap: 8px;
        }
        .btn-primary {
            background-color: var(--primary);
            color: #ffffff;
        }
        .btn-primary:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }
        .btn-large {
            padding: 20px 40px;
            font-size: 1.125rem;
        }

        /* Hero */
        .hero {
            min-height: 85vh;
            display: flex;
            align-items: center;
            background-color: var(--bg);
            border-bottom: 1px solid var(--border);
            padding-top: 120px;
        }
        .hero-content {
            max-width: 800px;
        }
        .rating-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            background-color: var(--surface-alt);
            border: 1px solid var(--border);
            border-radius: 100px;
            font-weight: 600;
            margin-top: 40px;
            font-size: 0.875rem;
        }
        .star-icon { color: #F59E0B; width: 16px; height: 16px; }

        /* Benefits */
        .benefits { background-color: var(--surface-alt); }
        .benefits-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 32px;
            margin-top: 48px;
        }
        @media (min-width: 768px) {
            .benefits-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .benefit-card {
            background: var(--surface);
            padding: 40px 32px;
            border-radius: var(--radius);
            border: 1px solid var(--border);
        }
        .benefit-icon {
            width: 48px;
            height: 48px;
            background-color: var(--primary);
            color: white;
            border-radius: var(--radius);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
        }
        .benefit-icon svg { width: 24px; height: 24px; fill: currentColor; }

        /* Social Proof */
        .social-proof { background-color: var(--bg); }
        .testimonials-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
            margin-top: 48px;
        }
        @media (min-width: 768px) {
            .testimonials-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .testimonial-card {
            padding: 32px;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            background: var(--surface);
        }
        .stars { display: flex; gap: 4px; margin-bottom: 16px; }
        .testimonial-text { font-style: italic; font-size: 1rem; margin-bottom: 24px; }
        .testimonial-author { font-weight: 600; font-size: 0.875rem; }

        /* About */
        .about { background-color: var(--surface-alt); border-top: 1px solid var(--border); }
        .about-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 64px;
            align-items: center;
        }
        @media (min-width: 768px) {
            .about-grid { grid-template-columns: 1fr 1fr; }
        }
        .about-stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
        }
        .stat-box {
            padding: 32px 24px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            text-align: center;
        }
        .stat-number {
            font-size: 3rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 8px;
            line-height: 1;
            letter-spacing: -0.03em;
        }
        .stat-label { font-size: 0.875rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.7; }

        /* Final CTA */
        .final-cta {
            background-color: var(--primary);
            color: #ffffff;
            text-align: center;
            padding: 120px 0;
        }
        .final-cta h2 { color: #ffffff; }
        .final-cta p { color: rgba(255,255,255,0.9); margin-bottom: 40px; }
        .final-cta .btn {
            background-color: #ffffff;
            color: var(--primary);
        }
        .final-cta .btn:hover {
            background-color: #f9fafb;
        }

        /* Footer */
        footer {
            padding: 64px 0 48px;
            background-color: #0a0a0a;
            color: #888888;
            text-align: center;
        }
        .footer-disclaimer {
            font-size: 0.75rem;
            margin-bottom: 32px;
            padding: 16px;
            border: 1px solid #333;
            border-radius: var(--radius);
            display: inline-block;
            max-width: 600px;
            line-height: 1.5;
        }
        .footer-info { font-size: 0.875rem; }

        /* Mobile FAB */
        .fab-whatsapp {
            display: none;
        }
        @media (max-width: 767px) {
            .fab-whatsapp {
                display: flex;
                position: fixed;
                bottom: 24px;
                right: 24px;
                width: 60px;
                height: 60px;
                background-color: #25D366;
                color: white;
                border-radius: 30px;
                align-items: center;
                justify-content: center;
                box-shadow: 0 8px 24px rgba(37, 211, 102, 0.3);
                z-index: 1000;
                transition: transform 0.2s ease;
            }
            .fab-whatsapp:active { transform: scale(0.95); }
            .fab-whatsapp svg { width: 32px; height: 32px; fill: currentColor; }
        }
    </style>
</head>
<body>

    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1>${lead.headline}</h1>
                <p>${lead.subheadline}</p>
                <a href="${whatsappUrl}" target="_blank" class="btn btn-primary btn-large">
                    ${lead.cta}
                </a>
                <div class="rating-badge">
                    <svg class="star-icon" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ${lead.nota} · ${lead.total_avaliacoes} avaliações no Google
                </div>
            </div>
        </div>
    </section>

    <section class="benefits">
        <div class="container">
            <h2>Por que nos escolher?</h2>
            <div class="benefits-grid">
                ${lead.beneficios.map((ben, i) => `
                <div class="benefit-card">
                    <div class="benefit-icon">
                        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                    </div>
                    <h3>Diferencial ${i+1}</h3>
                    <p class="text-small" style="margin-bottom:0">${ben}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <section class="social-proof">
        <div class="container">
            <h2>O que dizem sobre nós</h2>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div class="stars">
                        ${'<svg class="star-icon" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'.repeat(5)}
                    </div>
                    <p class="testimonial-text">"Excelente atendimento e profissionais muito capacitados. Recomendo de olhos fechados!"</p>
                    <p class="testimonial-author">Cliente Verificado</p>
                </div>
                <div class="testimonial-card">
                    <div class="stars">
                        ${'<svg class="star-icon" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'.repeat(5)}
                    </div>
                    <p class="testimonial-text">"O melhor lugar que já fui. Estrutura impecável e resultado acima do esperado."</p>
                    <p class="testimonial-author">Cliente Satisfeito</p>
                </div>
                <div class="testimonial-card">
                    <div class="stars">
                        ${'<svg class="star-icon" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'.repeat(5)}
                    </div>
                    <p class="testimonial-text">"Atendimento rápido e eficiente. Resolveram meu problema logo na primeira visita."</p>
                    <p class="testimonial-author">Cliente Fiel</p>
                </div>
            </div>
        </div>
    </section>

    <section class="about">
        <div class="container">
            <div class="about-grid">
                <div>
                    <h2>Sobre a ${lead.nome}</h2>
                    <p>Somos especialistas em entregar resultados de excelência na área de ${lead.categoria}. Nossa missão é proporcionar a melhor experiência possível, unindo técnica, tecnologia e atendimento humanizado.</p>
                    <p>Localizados em ${lead.endereco}, contamos com uma estrutura preparada para receber você com todo o conforto e segurança.</p>
                </div>
                <div class="about-stats">
                    <div class="stat-box">
                        <div class="stat-number">${lead.nota}</div>
                        <div class="stat-label">Nota Média</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-number">${lead.total_avaliacoes}+</div>
                        <div class="stat-label">Avaliações</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="final-cta">
        <div class="container">
            <h2>Pronto para dar o próximo passo?</h2>
            <p>Fale com nossa equipe agora mesmo e tire todas as suas dúvidas.</p>
            <a href="${whatsappUrl}" target="_blank" class="btn btn-large">
                ${lead.cta}
            </a>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="footer-disclaimer">
                Esta é uma página demonstrativa criada para apresentação comercial. Não representa o site oficial da empresa.
            </div>
            <div class="footer-info">
                <strong>${lead.nome}</strong><br>
                ${lead.endereco}
            </div>
        </div>
    </footer>

    <a href="${whatsappUrl}" target="_blank" class="fab-whatsapp" aria-label="Falar no WhatsApp">
        <svg viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.646.85 5.148 2.463 7.23L.75 24l4.906-1.688A11.96 11.96 0 0012.031 24c6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm0 22.016c-2.227 0-4.414-.594-6.32-1.72l-.453-.27-3.64 1.25 1.265-3.547-.296-.47A9.993 9.993 0 012.016 12.03c0-5.516 4.484-10 10.015-10 5.516 0 10 4.484 10 10s-4.484 10-10 10zm5.484-7.484c-.3-.15-1.781-.875-2.054-.976-.274-.102-.477-.15-.672.15-.203.3-.773.976-.945 1.172-.172.195-.352.226-.656.078-1.555-.75-2.68-1.46-3.703-3.234-.172-.3.172-.281.46-.852.094-.187.047-.351-.023-.5-.078-.15-.672-1.625-.922-2.226-.242-.586-.492-.508-.672-.516-.172-.008-.367-.008-.562-.008-.195 0-.516.07-.789.367-.273.297-1.047 1.023-1.047 2.492s1.07 2.89 1.22 3.086c.148.195 2.101 3.203 5.085 4.492 1.969.852 2.711.93 3.68.781.969-.148 3.125-1.273 3.562-2.5.438-1.226.438-2.273.305-2.492-.133-.219-.484-.344-.781-.492z"/></svg>
    </a>

</body>
</html>`;
  }
}
