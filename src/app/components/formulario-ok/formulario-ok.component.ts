import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-ok',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-zinc-50 dark:bg-[#09090b] flex items-center justify-center px-6">
      <div class="text-center max-w-sm">
        <div class="w-24 h-24 bg-green-50 dark:bg-green-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <i class="fa fa-check-circle text-5xl text-green-500"></i>
        </div>
        <h1 class="text-2xl font-black text-zinc-900 dark:text-white mb-3">¡Formulario enviado!</h1>
        <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
          Tu respuesta fue registrada correctamente.<br>
          Gracias por diligenciar el formulario.
        </p>
        <div class="w-10 h-[3px] bg-green-600 rounded-full mx-auto mt-6"></div>
      </div>
    </div>
  `
})
export class FormularioOkComponent {}
