import { AfterViewInit, Component, NgZone, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface DestinationCard {
    id: string;
    title: string;
    img: string;
    topPercent: number;
    leftPercent: number;
    route: string;
}

@Component({
    selector: 'app-explorer',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './explorer.component.html',
    styleUrl: './explorer.component.css'
})
export class ExplorerComponent implements AfterViewInit, OnDestroy {
    cards: DestinationCard[] = [
        { id: 'usa', title: 'USA', img: 'assets/images/a.jpg', leftPercent: 12, topPercent: 8, route: '/travel-package/outbound/usa' },
        { id: 'uk', title: 'UK', img: 'assets/images/b.jpg', leftPercent: 70, topPercent: 18, route: '/travel-package/outbound/uk' },
        { id: 'fr', title: 'France', img: 'assets/images/c.jpg', leftPercent: 15, topPercent: 95, route: '/travel-package/outbound/france' },
        { id: 'uae', title: 'UAE', img: 'assets/images/d.jpg', leftPercent: 58, topPercent: 40, route: '/travel-package/outbound/uae' },
        { id: 'jp', title: 'Japan', img: 'assets/images/e.jpg', leftPercent: 18, topPercent: 56, route: '/travel-package/outbound/japan' },
        { id: 'cn', title: 'China', img: 'assets/images/f.jpg', leftPercent: 72, topPercent: 68, route: '/travel-package/outbound/china' },
        { id: 'in', title: 'India', img: 'assets/images/g.jpg', leftPercent: 38, topPercent: 82, route: '/travel-package/outbound/india' }
    ];

    private ctx?: gsap.Context;
    pathD = '';
    private svgW = 1440;
    private svgH = 2500;
    private segLens: number[] = [];
    private cumSeg: number[] = [];

    constructor(private zone: NgZone) { }

    ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => {
            gsap.registerPlugin(ScrollTrigger);
            this.ctx = gsap.context(() => {
                const container = document.querySelector<HTMLElement>('#explorerRoot');
                const dotted = document.querySelector<SVGPathElement>('#flightPathDotted');
                const reveal = document.querySelector<SVGPathElement>('#revealPath');
                const plane = document.querySelector<HTMLElement>('#planeIcon');
                const full = document.querySelector<SVGPathElement>('#flightPathFull');
                if (!container || !dotted || !reveal || !plane || !full) return;

                // Build straight-line path through card points in SVG coordinate space
                const pts = this.cards.map(c => ({
                    x: (c.leftPercent / 100) * this.svgW,
                    y: (c.topPercent / 100) * this.svgH,
                }));
                this.pathD = pts.reduce((acc, p, i) => acc + (i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`), '');
                full.setAttribute('d', this.pathD);
                reveal.setAttribute('d', this.pathD);
                dotted.setAttribute('d', this.pathD);

                // Compute segment and cumulative lengths (straight lines)
                this.segLens = [];
                this.cumSeg = [];
                let accLen = 0;
                for (let i = 1; i < pts.length; i++) {
                    const dx = pts[i].x - pts[i - 1].x;
                    const dy = pts[i].y - pts[i - 1].y;
                    const len = Math.hypot(dx, dy);
                    this.segLens.push(len);
                    accLen += len;
                    this.cumSeg.push(accLen);
                }
                const totalLen = accLen;

                // Initial: reveal first segment fully
                const initialVisible = this.cumSeg[0];
                reveal.style.strokeDasharray = `${initialVisible} ${totalLen}`;

                const cardEls = this.cards.map(c => document.getElementById(`card-${c.id}`) as HTMLElement | null);

                // One overall ScrollTrigger mapping progress to segment-wise reveal
                ScrollTrigger.create({
                    trigger: container,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true,
                    onUpdate: (self) => {
                        const segments = this.segLens.length; // n-1
                        if (segments <= 1) return;
                        const t = self.progress; // 0..1
                        const scaled = t * (segments - 1);
                        const idx = Math.floor(scaled) + 1; // current segment index (1..segments-1)
                        const frac = scaled - Math.floor(scaled);

                        const startLen = this.cumSeg[Math.max(0, idx - 1)];
                        const endLen = this.cumSeg[Math.min(segments - 1, idx)];
                        const visibleLen = startLen + (endLen - startLen) * frac;

                        // Update mask to reveal dotted path
                        reveal.style.strokeDasharray = `${visibleLen} ${totalLen}`;

                        // Move plane to tip
                        const p = full.getPointAtLength(visibleLen);
                        const p2 = full.getPointAtLength(Math.min(visibleLen + 1, totalLen));
                        const angle = Math.atan2(p2.y - p.y, p2.x - p.x) * (180 / Math.PI);
                        plane.style.transform = `translate(${p.x - 12}px, ${p.y - 12}px) rotate(${angle}deg)`;

                        // Highlight reached cards
                        this.cumSeg.forEach((cum, i) => {
                            const el = cardEls[i + 1]; // card i+1 is at end of segment i
                            if (!el) return;
                            if (visibleLen >= cum - 2) {
                                el.classList.add('ring-4', 'ring-yellow-400', 'scale-105', 'shadow-2xl');
                            } else {
                                el.classList.remove('ring-4', 'ring-yellow-400', 'scale-105', 'shadow-2xl');
                            }
                        });
                    }
                });

                // Floating animation for cards
                cardEls.forEach((el, idx) => {
                    if (!el) return;
                    gsap.to(el, {
                        y: idx % 2 === 0 ? -6 : 6,
                        duration: 2.4,
                        ease: 'sine.inOut',
                        yoyo: true,
                        repeat: -1,
                    });
                });
            });
        });
    }

    ngOnDestroy(): void {
        this.ctx?.revert();
    }
}
