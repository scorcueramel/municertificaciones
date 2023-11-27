import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { TiposHabilitaciones } from '@core/interfaces/tipos-habilitaciones';
import { TiposVias } from '@core/interfaces/tipos-vias';
import { TiposHabilitacionesUrbanasService } from '@core/services/maestra-vias/tipos-habilitaciones-urbanas.service';
import { TiposViasService } from '@core/services/maestra-vias/tipos-vias.service';
import { SwalService } from '@core/services/resources/swal.service';

@Component({
  selector: 'app-vias',
  templateUrl: './vias.component.html',
  styleUrls: ['./vias.component.css'],
})
export class ViasComponent implements OnInit {
  @ViewChild('codigoHB') codigoHB!: ElementRef<HTMLElement>;
  @ViewChild('codigoHBLabel') codigoHBLabel!: ElementRef<HTMLElement>;
  @ViewChild('formButtonSearch') formButtonSearch!: ElementRef<HTMLElement>;
  @ViewChild('codigoVia') codigoVia!: ElementRef<HTMLElement>;
  @ViewChild('codigoViaLabel') codigoViaLabel!: ElementRef<HTMLElement>;

  constructor(
    private _tiposHabUrb: TiposHabilitacionesUrbanasService,
    private _tiposVias: TiposViasService,
    private _swal: SwalService,
    private elementRef: ElementRef,
    private render2: Renderer2
  ) {}

  exitoCarga: boolean = false;
  errorCarga: boolean = false;
  validadorHU: boolean = false;
  validadorVIA: boolean = false;

  tituloToast!:string;
  cuerpoToast!:string;

  listTiposHabUrb: TiposHabilitaciones[] = [];
  listTiposVias: TiposVias[] = [];

  habUrbanas: TiposHabilitaciones = {
    INTTCUCODIGO: '',
    VCHTCUDESCRIPCION: '',
    CHRCURCODIGO: '',
    VCHCURDESCRIPCION1: '',
  };

  vias: TiposVias = {
    INTTVICODIGO: '',
    VCHTVIDESCRIPCION: '',
    VCHVIACODIGO: '',
    VCHVIADESCRIPCION: '',
  };

  ngOnInit(): void {
    this.getTypesHabUrb();
    this.getTypesVias();
  }

  getTypesHabUrb(): void {
    this._tiposHabUrb.getAllTypeHabilitacionesUrbanas().subscribe({
      next: (resp: any) => {
        this.listTiposHabUrb = resp.contenido;
      },
      error: (err: any) => {
        this.errorCarga = true;
        this.tituloToast = "Oooooppppss!!";
        this.cuerpoToast = `Error al cargar el servicio : ${err.message}`;
        console.log(err);
      },
    });
  }

  getTypesVias(): void {
    this._tiposVias.getAllTypeVias().subscribe({
      next: (resp: any) => {
        this.listTiposVias = resp.contenido;
      },
      error: (err: any) => {
        this.errorCarga = true;
        this.tituloToast = "Oooooppppss!!";
        this.cuerpoToast = `Error al cargar el servicio : ${err.message}`;
        console.log(err);
      },
    });
  }

  validarLargoHU(event: any): void {
    let largoCodigoHU = event.target.value.length;

    const valLengthCodHB =
      this.elementRef.nativeElement.querySelector('#cod_hab_urb');
    const codHBLabel =
      this.elementRef.nativeElement.querySelector('.form__label__hu');
    const formButtonSearch = this.elementRef.nativeElement.querySelector(
      '.card__button__search'
    );

    if (largoCodigoHU > 3) {
      this.validadorHU = true;
      this.render2.setStyle(valLengthCodHB, 'border', '1px solid red');
      this.render2.addClass(codHBLabel, 'text-danger');
      this.render2.setAttribute(formButtonSearch, 'disabled', 'disabled');
    } else {
      this.validadorHU = false;
      this.render2.removeStyle(valLengthCodHB, 'border');
      this.render2.removeClass(codHBLabel, 'text-danger');
      this.render2.removeAttribute(formButtonSearch, 'disabled');
    }
  }

  validarLargoVIA(event: any): void {
    let largoCodigoVia = event.target.value.length;

    const valLengthCodVia =
      this.elementRef.nativeElement.querySelector('#cod_via');
    const codViaLabel =
      this.elementRef.nativeElement.querySelector('.form__label__via');
    const formButtonSearch = this.elementRef.nativeElement.querySelector(
      '.card__button__search'
    );

    if (largoCodigoVia > 4) {
      this.validadorVIA = true;
      this.render2.setStyle(valLengthCodVia, 'border', '1px solid red');
      this.render2.addClass(codViaLabel, 'text-danger');
      this.render2.setAttribute(formButtonSearch, 'disabled', 'disabled');
    } else {
      this.validadorVIA = false;
      this.render2.removeStyle(valLengthCodVia, 'border');
      this.render2.removeClass(codViaLabel, 'text-danger');
      this.render2.removeAttribute(formButtonSearch, 'disabled');
    }
  }

  limpiarBusqueda(): void {
    const valLengthCodHB =
      this.elementRef.nativeElement.querySelector('#cod_hab_urb');
    const codHBLabel =
      this.elementRef.nativeElement.querySelector('.form__label__hu');
    const valLengthCodVia =
      this.elementRef.nativeElement.querySelector('#cod_via');
    const codViaLabel =
      this.elementRef.nativeElement.querySelector('.form__label__via');
    const formButtonSearch = this.elementRef.nativeElement.querySelector(
      '.card__button__search'
    );
    this.render2.removeStyle(valLengthCodHB, 'border');
    this.render2.removeClass(codHBLabel, 'text-danger');
    this.render2.removeStyle(valLengthCodVia, 'border');
    this.render2.removeClass(codViaLabel, 'text-danger');
    this.render2.removeAttribute(formButtonSearch, 'disabled');

    this.validadorHU = false;
    this.validadorVIA = false;

    this.habUrbanas = {
      INTTCUCODIGO: '',
      VCHTCUDESCRIPCION: '',
      CHRCURCODIGO: '',
      VCHCURDESCRIPCION1: '',
    };
    this.vias = {
      INTTVICODIGO: '',
      VCHTVIDESCRIPCION: '',
      VCHVIACODIGO: '',
      VCHVIADESCRIPCION: '',
    };
  }
}
