import { Component,OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Torneos } from '../../interfaces/interfaces';
import { environment } from "../../../environments/environment";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-torneos-front',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgSelectModule],
  templateUrl: './torneos-front.component.html',
  styleUrl: './torneos-front.component.css'
})
export class TorneosFrontComponent implements OnInit {

  torneos: Torneos[] = [];
  pathIm = environment.apiURL;
  mostrarDescripcionCompleta = false;
  fechaInicio= '';
  fechaFin= '';

 
  constructor(private apiRest: ApiService,private router: Router) {}

   ngOnInit(): void {
    this.apiRest.get_All_torneos_Dele()
      .subscribe((res: any) => {
        this.torneos = res.torneos;
        console.log(this.torneos);
        
      
    });
    
   
  }


  
  InfoTorneo(IdTorneo:number){
   this.router.navigate(['/InfoT/'+IdTorneo]);
  
  }

    cerrarSesion(){
     this.apiRest.logOut();
     this.router.navigate(['/home']);
  }

  tomarFechas() {

     this.apiRest.GetTorneoFechas(this.fechaInicio,this.fechaFin).subscribe((res: any) => {

      if(res.success){
        this.torneos = res.torneos;
      }

    });


    // Aquí puedes hacer el filtro o lo que necesites
  }


}
