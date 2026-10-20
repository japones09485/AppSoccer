import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService, SkinId } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'appSoccer';

  constructor(public themeService: ThemeService) {}

  get isDark():        boolean  { return this.themeService.isDark; }
  get currentSkin():   SkinId   { return this.themeService.currentSkin; }
  get skins()                   { return this.themeService.SKINS; }
  get skinPanelOpen(): boolean  { return this.themeService.skinPanelOpen; }
  get isClasico():     boolean  { return this.themeService.isClasico; }

  toggleTheme():        void    { this.themeService.toggle(); }
  toggleSkinPanel():    void    { this.themeService.toggleSkinPanel(); }
  closeSkinPanel():     void    { this.themeService.closeSkinPanel(); }
  setSkin(id: SkinId):  void    { this.themeService.setSkin(id); }
}
