import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root',
})
export class SwalService {
  wait(): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      iconColor: '#005ea5',
      text: 'Espere un momento por favor...',
    });
    Swal.showLoading();
  }

  close(): void {
    Swal.close();
  }

  error(mensaje: string): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'error',
      text: mensaje,
    });
  }

  validador(mensaje: string, fn: () => void): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'error',
      text: mensaje,
    }).then(() => fn());
  }

  info(mensaje: string): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'warning',
      text: mensaje,
    });
  }

  success(mensaje: string, fn: () => void): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'success',
      text: mensaje,
    }).then(() => fn());
  }

  confirm(titulo: string, mensaje: string, fn: () => void): void {
    Swal.fire({
      icon: 'question',
      title: titulo,
      html: mensaje,
      showCancelButton: true,
      confirmButtonColor: '#005ea5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        fn();
      }
    });
  }

  popup(imagen?: string): void {
    Swal.fire({
      imageUrl: imagen ?? 'https://unsplash.it/400/200',
      width: 800,
      imageAlt: 'Custom image',
      background: 'transparent',
      timer: 20000,
      showConfirmButton: false,
      showCloseButton: true,
    });
  }
}
