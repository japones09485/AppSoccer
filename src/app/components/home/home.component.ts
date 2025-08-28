import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
 
})
export class HomeComponent implements OnInit {

  videoSrc:string='';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const videos = ['home1.mov', 'home2.mp4', 'home3.mp4'];
    const randomIndex = Math.floor(Math.random() * videos.length);
      this.videoSrc = `../../../assets/home/${videos[randomIndex]}`;
  }

  Inscribete(opcion:number) {
    if(opcion == 1){

       this.router.navigate(['/inscripcion']);

    }else if(opcion == 2){

      this.router.navigate(['/inscripcionCl']);

    }
   
  }

  admin() {
    this.router.navigate(['/admin']);
  }

  torneos(){
       this.router.navigate(['/TorneosF']);
  }
}
