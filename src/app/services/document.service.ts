import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private urlAPI = environment.apiURL;
  constructor(private http: HttpClient) { }

  procesarDocumento(formData: FormData): Observable<any> {
    return this.http.post(`${this.urlAPI}Documento_api/procesar`, formData);
  }
} 