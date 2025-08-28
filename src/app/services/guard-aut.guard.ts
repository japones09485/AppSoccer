import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAutGuard  {

  constructor(
    private service: ApiService,
    private route: Router) { }

  async canActivate(): Promise<any> {
    const token = sessionStorage.getItem('token');
    const user = this.service.getUser();
    if (!token || !user) {
      this.route.navigate(['/home']);
      return false;
    }
    const responseVerify: any = await this.service.isAuthenticated().toPromise()
    return responseVerify.status === true? true:false
  }

}
