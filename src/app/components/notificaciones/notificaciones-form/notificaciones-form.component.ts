import { Component  } from '@angular/core';
import { NotificacionesService } from '../service/notificaciones.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormularioComponent } from '../../formulario/formulario.component';
import { EntidadesService } from '../../entidades/service/entidades.service';
import { Entidades } from '../../entidades/model/entidades.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


interface FoodWithLink {
  value: string;
  viewValue: string;
  link: string;
}

@Component({
  selector: 'app-notificaciones-form',
  templateUrl: './notificaciones-form.component.html',
  styleUrls: ['./notificaciones-form.component.scss']
})
export class NotificacionesFormComponent {


  actionsWithLinks: FoodWithLink[] = [
    { value: 'Informe de incumplimiento', viewValue: 'Informe de incumplimiento', link: 'https://docs.google.com/forms/d/e/1FAIpQLScP_1MpoNeWD8w6JBbce7YgEiZBzClZ_6pJeji7ppEEp6aYAw/viewform' },
    { value: 'Informe de seguimiento', viewValue: 'Informe de seguimiento', link: 'https://docs.google.com/forms/d/e/1FAIpQLSf1WuD72Z-Vl0cJEnSqTi8-zfwCYlPZnMCwGZJXY1seuSjqig/viewform' },
    { value: 'Informe de Incidencia', viewValue: 'Informe de Incidencia', link: 'https://docs.google.com/forms/d/e/1FAIpQLSeqhEpkqnsMpiu_vwGg4LVHYc7xjNh8v7U4YKUxtdVnj7A3fg/viewform' },
    { value: 'Informe final', viewValue: 'Informe final', link: 'https://docs.google.com/forms/d/e/1FAIpQLSfzhZkZM0lQ6M7Wd7Rj-0Jmm964SDGuMpEPkib2l0Wbin_2lQ/viewform' },
  ];

  idfuncionario: number | undefined;
  identidad: number | undefined;
  fecha: Date | any;
  accionSeleccionada: string | undefined;
  entidades: Entidades[] = [];
  funcionarios: [] | any;
  isLinear = true;

  constructor(private apiService: NotificacionesService, public dialogRef: MatDialogRef<NotificacionesFormComponent>, private dialog: MatDialog, private entidadesService: EntidadesService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.cargarEntidades();
    this.cargarFuncionario();
    this.getSelectedLink();
  }
  onClose(): void {
    this.dialogRef.close();
    this.cargarEntidades();
  }

  getLinkForSelectedAction(): string | undefined {
    return this.actionsWithLinks.find(action => action.value === this.accionSeleccionada)?.link;
  }


  onSave() {
    const formData = {
      id_funcionary: this.idfuncionario,
      id_entities: this.identidad,
      description: this.accionSeleccionada,
      date_notification: this.formatDate(this.fecha),
      url: this.getLinkForSelectedAction(),
      active: "A"
    };

    this.apiService.createNotification(formData).subscribe(
      (response) => {
        console.log('Notificación creada con éxito:', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error al crear la notificación:', error);
      }
    );
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month < 10 ? '0' : ''}${month}-${day}`;
  }


  abrirEnlace() { }


  cargarEntidades() {
    this.entidadesService.findAll().subscribe(
      (data) => {
        this.entidades = data;
        console.log('Entidades cargadas con éxito:', data);
      },
      (error) => {
        console.error('Error al cargar las entidades', error);
      }
    )
  }
  cargarFuncionario() {
    this.apiService.obtenerDatos().subscribe(
      (data) => {
        this.funcionarios = data;
        console.log('Entidades cargadas con éxito:', data);
      },
      (error) => {
        console.error('Error al cargar las entidades', error);
      }
    )
  }

  getSelectedLink(): any {
    const selectedAction = this.actionsWithLinks.find(action => action.value === this.accionSeleccionada);
    const url = selectedAction ? selectedAction.link : '';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
};


