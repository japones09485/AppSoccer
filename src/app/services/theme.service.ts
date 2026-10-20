import { Injectable } from '@angular/core';

export type SkinId =
  | 'clasico' | 'vestuario' | 'cancha' | 'tablero' | 'palco'
  | 'reflector' | 'pizarron' | 'pasto' | 'cronica' | 'camiseta' | 'tribuna';

export interface Skin {
  id: SkinId;
  name: string;
  colors: [string, string, string]; // [bg, surface, accent]
  dark: boolean;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {

  isDark = false;
  currentSkin: SkinId = 'clasico';
  skinPanelOpen = false;

  readonly SKINS: Skin[] = [
    { id: 'clasico',   name: 'Clásico',   colors: ['#EEF2F7','#FFFFFF','#22C55E'], dark: false },
    { id: 'vestuario', name: 'Vestuario',  colors: ['#09090f','#111218','#22c55e'], dark: true  },
    { id: 'cancha',    name: 'Cancha',     colors: ['#f0fdf4','#ffffff','#16a34a'], dark: false },
    { id: 'tablero',   name: 'Tablero',    colors: ['#000000','#111111','#f59e0b'], dark: true  },
    { id: 'palco',     name: 'Palco',      colors: ['#020817','#0a1628','#38bdf8'], dark: true  },
    { id: 'reflector', name: 'Reflector',  colors: ['#050612','#0a0c1e','#0ea5e9'], dark: true  },
    { id: 'pizarron',  name: 'Pizarrón',   colors: ['#0d1117','#161b22','#2ea043'], dark: true  },
    { id: 'pasto',     name: 'Pasto',      colors: ['#0f2d1a','#1a3d24','#4ade80'], dark: true  },
    { id: 'cronica',   name: 'Crónica',    colors: ['#fafafa','#ffffff','#dc2626'], dark: false },
    { id: 'camiseta',  name: 'Camiseta',   colors: ['#ffffff','#f8fafc','#dc2626'], dark: false },
    { id: 'tribuna',   name: 'Tribuna',    colors: ['#f5f3ff','#ffffff','#7c3aed'], dark: false },
  ];

  private readonly THEME_KEY = 'soccer-theme';
  private readonly SKIN_KEY  = 'soccer-skin';

  constructor() {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    this.isDark = savedTheme === 'dark';
    const savedSkin = (localStorage.getItem(this.SKIN_KEY) ?? 'clasico') as SkinId;
    this.currentSkin = this.SKINS.find(s => s.id === savedSkin)?.id ?? 'clasico';
    this.applyAll();
  }

  toggle(): void {
    if (this.currentSkin !== 'clasico') return;
    this.isDark = !this.isDark;
    localStorage.setItem(this.THEME_KEY, this.isDark ? 'dark' : 'light');
    this.applyAll();
  }

  setSkin(id: SkinId): void {
    this.currentSkin = id;
    localStorage.setItem(this.SKIN_KEY, id);
    if (id !== 'clasico') this.isDark = false;
    this.skinPanelOpen = false;
    this.applyAll();
  }

  toggleSkinPanel(): void {
    this.skinPanelOpen = !this.skinPanelOpen;
  }

  closeSkinPanel(): void {
    this.skinPanelOpen = false;
  }

  get isClasico(): boolean { return this.currentSkin === 'clasico'; }

  private applyAll(): void {
    const html = document.documentElement;
    const darkSkins: SkinId[] = ['vestuario','tablero','palco','reflector','pizarron','pasto'];
    if (this.currentSkin === 'clasico') {
      html.classList.toggle('dark', this.isDark);
    } else if (darkSkins.includes(this.currentSkin)) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    html.setAttribute('data-skin', this.currentSkin);
  }
}
