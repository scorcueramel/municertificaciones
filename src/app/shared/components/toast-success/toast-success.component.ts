import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast-success',
  templateUrl: './toast-success.component.html',
  styleUrls: ['./toast-success.component.css']
})
export class ToastSuccessComponent {
  @Input() componenteToastSuccess: any = {
    titulo:'',
    cuerpo:''
  };

}
