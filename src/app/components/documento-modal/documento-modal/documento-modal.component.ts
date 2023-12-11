import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DocumentoModalService } from '../service/documento-modal.service';

@Component({
  selector: 'app-documento-modal',
  templateUrl: './documento-modal.component.html',
  styleUrls: ['./documento-modal.component.scss']
})
export class DocumentoModalComponent {
  data: any;
  dni: string | undefined;

  constructor(private ApiService: 
    DocumentoModalService, public bsModalRef: BsModalRef) { }

    ngOnInit(): void {
      if (this.dni) {
        this.ApiService.getData(this.dni).subscribe(
          (response: any) => {
            this.data = response;
            console.log(this.dni);
          },
          error => {
            console.error(`Error para DNI ${this.dni}:`, error);
          }
        );
      }
    }

    cerrarModal() {
      this.bsModalRef.hide();
    }

    getLinkDisplayName(tipo: string): string {
      switch (tipo) {
        case 'ANX00':
          return 'FICHA DE INGRESO';
        case 'ANX01':
          return 'ACTA DE COMPROMISO DE INSCRIPCIÓN';
        case 'ANX1B':
          return 'ACTA DE COMPROMISO POR INCUMPLIMIENTO';
        case 'ANX1C':
          return 'ACTA DE CONOCIMIENTO DEL PLAN DE TRATAMIENTO INDIVIDUAL';
        case 'ANX1E':
          return 'ACTA DE COMPROMISO E INSCRIPCIÓN “PROGRAMA DE ESCUELA DE PADRES';
        case 'ANX0A':
          return 'ACTA DE COMPROMISO DEL ADOLESCENTE Y SUS PADRES';
        case 'ANX0B':
          return 'CONSTANCIA DE VISITA DOMICILIARIA';
        case 'ANX05':
          return 'SERVICIO DE ORIENTACIÓN AL ADOLESCENTE SOA CAÑETE - CITACIÓN';
        case 'ANX02':
          return 'EVALUCIÓN DEL RIESGO DE VIOLENCIA EN JÓVENES (SAVRY)';
        case 'HCR20':
          return 'HOJA DE CODIFICACIÓN (HCR20)';
        case 'ANX04':
          return 'FICHA PSICOSOCIAL';
        default:
          return 'ACTA DE CONOCIMIENTO DE MODIFICACION DEL PLAN DE TRATAMIENTO INDIVIDAL';
      }
    }
}
