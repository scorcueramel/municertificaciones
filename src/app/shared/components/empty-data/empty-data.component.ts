import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.css'],
})
export class EmptyDataComponent {
  @Input() icono!: string;
  @Input() texto!: string;
}
