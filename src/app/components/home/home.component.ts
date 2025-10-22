import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
 
})
export class HomeComponent implements OnInit {

  videoSrc:string='';
  pathIm = environment.apiURL;
  

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

  abrirYDescargarPdf(): void {
  const url = this.pathIm + 'doc/PADRES_DOC.pdf';

  // Abrir nueva pestaña
  const nuevaPestana = window.open('', '_blank');

  if (nuevaPestana) {
    // Insertar un pequeño HTML que fuerza la descarga
    nuevaPestana.document.write(`
      <html>
        <body>
          <a href="${url}" download="PADRES_DOC.pdf" id="descarga"></a>
          <script>
            document.getElementById('descarga').click();
          </script>
          <p>Si no inicia la descarga, <a href="${url}" download="PADRES_DOC.pdf">haz clic aquí</a>.</p>
        </body>
      </html>
    `);
  }
}
}
