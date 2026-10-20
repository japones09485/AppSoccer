import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from '../form-builder/form-builder.component';

@Component({
  selector: 'app-form-builder-page',
  standalone: true,
  imports: [CommonModule, FormBuilderComponent],
  templateUrl: './form-builder-page.component.html',
})
export class FormBuilderPageComponent implements OnInit {
  idFormulario!: number;
  nombreFormulario = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.idFormulario = +p['idFormulario'];
    });
  }

  volver() {
    this.router.navigate(['/adminTemp']);
  }
}
