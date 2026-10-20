import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAutGuard {

  constructor(private service: ApiService, private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('token');
    const user = this.service.getUser();
    if (!token || !user) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
