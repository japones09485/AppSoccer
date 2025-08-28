import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { ApiService } from "../../services/api.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  standalone: true,
 imports: [CommonModule, ReactiveFormsModule,RouterModule], 
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {


  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router,private apiRest: ApiService) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  

  onSubmit() {

    
 this.apiRest.logInFront(this.loginForm.value).subscribe((res: any) => {
    
  if (res.success === true) {

    
    sessionStorage.setItem('token', res.token);
    sessionStorage.setItem('user', JSON.stringify(res.user));

      if(res.user.perfil == 1){
        //admin
        this.router.navigate(['/adminTemp']);
      }else if(res.user.perfil == 2){
        //Administrador Equipo

        this.router.navigate(['/AdminEq']);
        

      }else if(res.user.perfil == 3){
        //Delegado de Cancha

        this.router.navigate(['/DelegaCh']);

      }
    
    
    }else{
      Swal.fire(res.msj);
    }
    
  });


  }
  
}
