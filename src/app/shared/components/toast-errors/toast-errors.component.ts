import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast-errors',
  templateUrl: './toast-errors.component.html',
  styleUrls: ['./toast-errors.component.css']
})
export class ToastErrorsComponent {
  @Input() tituloToast!:string;
  @Input() cuerpoToast!:string;
}
