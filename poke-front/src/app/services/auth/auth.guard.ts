import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService);
  let router = inject(Router);

  if (!auth.isAuthenticated()) {
    router.navigate(['login']);
    return false;
  } else {
    let user = JSON.parse(localStorage.getItem('user')!);
    let path = route.data['path'];

    if (user.role !== 'admin' && path) {
      return false;
    }
    return true;
  }
};
