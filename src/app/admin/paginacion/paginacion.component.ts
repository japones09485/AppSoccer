import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-paginacion',
  imports: [CommonModule],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})

export class PaginacionComponent implements OnInit, OnChanges {

  @Input() nPaginas: number = 0;
  @Output() irPagina = new EventEmitter<number>();

  numberPags: number[] = [];

  ngOnInit(): void {
    this.generarPaginas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nPaginas']) {
      this.generarPaginas();
    }
  }

  private generarPaginas() {
    this.numberPags = Array.from({ length: this.nPaginas }, (_, i) => i + 1);
    
  }

  cambiarPagina(pagina: number) {
    this.irPagina.emit(pagina);
  }
}
