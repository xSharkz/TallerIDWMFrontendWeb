import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

/**
 * Guardia de ruta para verificar si el usuario está autenticado y autorizado para acceder a rutas específicas.
 *
 * Este guardia verifica:
 * - Si existe un token en el almacenamiento local.
 * - Si el token es válido y contiene un correo electrónico que termina en '@idwm.cl'.
 *
 * @param route - Información de la ruta actual.
 * @param state - Estado de la navegación.
 * @returns `true` si el usuario está autorizado, de lo contrario redirige a `/login`.
 */
export const authGuard: CanActivateFn = (route, state) => {
  // Inyectar el servicio de enrutamiento para redirección.
  const router = inject(Router);

  // Recuperar el token almacenado en el navegador.
  const token = localStorage.getItem('token');

  console.log('Token recibido:', token);

  if (token) {
    try {
      // Decodificar el token JWT.
      const base64Url = token.split('.')[1]; // Extraer la parte del payload.
      if (!base64Url) throw new Error('Token malformado');

      // Normalizar la cadena Base64 y decodificarla.
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64)); // Decodificar el payload JSON.

      console.log('Payload decodificado:', payload);

      // Verificar si el correo electrónico termina con '@idwm.cl'.
      if (payload.email && payload.email.endsWith('@idwm.cl')) {
        return true; // Permitir el acceso.
      } else {
        alert('Acceso denegado. Solo administradores pueden acceder a esta ruta.');
        router.navigate(['/login']); // Redirigir a la página de inicio de sesión.
        return false;
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      router.navigate(['/login']); // Redirigir si el token no es válido.
      return false;
    }
  } else {
    // Redirigir si no hay token almacenado.
    router.navigate(['/login']);
    return false;
  }
};
