import { Component, TemplateRef } from '@angular/core';
import { TiposHabilitaciones } from '@core/interfaces/tipos-habilitaciones';
import { TiposVias } from '@core/interfaces/tipos-vias';
import { ViasHaburb } from '@core/interfaces/vias-haburb';
import { TiposHabilitacionesUrbanasService } from '@core/services/tablas/tipos-habilitaciones-urbanas.service';
import { TiposViasService } from '@core/services/tablas/tipos-vias.service';

@Component({
  selector: 'app-padron-numeracion',
  templateUrl: './padron-numeracion.component.html',
  styleUrls: ['./padron-numeracion.component.css'],
})
export class PadronNumeracionComponent {
  constructor(
    private _tiposHabUrb: TiposHabilitacionesUrbanasService,
    private _tiposVias: TiposViasService,
  ) {}

  // Validador de carga del sevicio para los selects
  exitoCarga: boolean = false;
  errorCarga: boolean = false;
  // Validador de datos obtenidos luego de la consulta con el fin de mostrar la tabla
  dataObtenida: boolean = false;
  // Validador de datos sin resultado
  sinResultados: boolean = false;

  // Contenido del toast en caso de error al conectar el sevicio
  tituloToast!: string;
  cuerpoToast!: string;
  // Titulo del tabla resultante de la busqueda
  tituloTabla!: string;

  // Llenar los selects para selecionar tipo habilicaion y tipo vía
  listTiposHabUrb: TiposHabilitaciones[] = [];
  listTiposVias: TiposVias[] = [];

  // Objeto para emitir busqueda
  viaHabUrb: ViasHaburb = {
    CHRCURCODIGO: '',
    INTTCUCODIGO: '',
    VCHVIADESCRIPCION: '',
    VCHTVIDESCRIPCION: '',
    VCHVIACODIGO: '',
    VCHCURDESCRIPCION1: '',
    VCHTCUDESCRIPCION: '',
    INTTVICODIGO: '',
  };

  // Objeto para obtenre búsqueda de padró


  // Objeto para emitir la búsqueda del padron


  //valores para llena la tabla pluego de la consulta
  cabecerasYfooterTabla: any[] = [];
  cuerpoTabla: any[] = [];

  // Valores para resultados sin datos
  icono!: string;
  texto!: string;

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
        this.tituloToast = 'Oooooppppss!!';
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
        this.tituloToast = 'Oooooppppss!!';
        this.cuerpoToast = `Error al cargar el servicio : ${err.message}`;
        console.log(err);
      },
    });
  }

  limpiarBusqueda(): void {
    this.tituloTabla = '';
    this.cuerpoTabla = [];
    this.cabecerasYfooterTabla = [];

    this.dataObtenida = false;
    this.sinResultados = false;
  }

  ngOnDestroy(): void {
    // Todo lo que se encuentra dentro se ejecuta una vez se destruye el componente.
    this.cuerpoTabla = [];
  }
}
