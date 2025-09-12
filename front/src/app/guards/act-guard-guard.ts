import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth';


export const actGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const loginS = inject(AuthService)

  if (loginS.iniciarSesion()) {
    return true
  } else {
    router.navigateByUrl("/login")
    return false
  }
};
