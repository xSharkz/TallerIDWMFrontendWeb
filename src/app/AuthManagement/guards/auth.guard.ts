import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  console.log('Token recibido:', token);

  if (token) {
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) throw new Error('Token malformado');

      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));

      console.log('Payload decodificado:', payload);

      if (payload.email && payload.email.endsWith('@idwm.cl')) {
        return true;
      } else {
        alert('Acceso denegado. Solo administradores pueden acceder a esta ruta.');
        router.navigate(['/login']);
        return false;
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      router.navigate(['/login']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};
