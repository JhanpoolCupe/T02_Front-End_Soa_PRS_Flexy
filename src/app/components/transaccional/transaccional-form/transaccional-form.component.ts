import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transactional } from '../model/transacional.modal';
import { TransaccionalService } from '../service/transaccional.service';
import { ProgramasService } from '../../programas/service/programas.service';
import { ActividadService } from '../../actividad/service/actividad.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { Actividad, PROGRAMAS, Programa } from '../../mock-data';
import { AsignationData } from '../model/registerMulti.modal';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-transaccional-form',
  templateUrl: './transaccional-form.component.html',
  styleUrls: ['./transaccional-form.component.scss']
})
export class TransaccionalFormComponent implements OnInit, OnDestroy {

  registroForm!: FormGroup;
  programas: Programa[] = PROGRAMAS;
  actividades: Actividad[] = [];
  registroError: boolean = false;
  registrosTemporales: Transactional[] = [];
  isFormEmpty: boolean = true;

  constructor(
    private transaccionalService: TransaccionalService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransaccionalFormComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService
  ) {
    this.registroForm = this.fb.group({
      id_programs: [null, Validators.required],
      id_activities: [null, Validators.required],
      date_asignation: [null, Validators.required],
      direction: [null, Validators.required],
    });
  }


  

  ngOnInit(): void {
    this.initAsignationForm();
    this.checkFormEmpty();
    this.findAllActividad();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  checkFormEmpty() {
    this.isFormEmpty = Object.values(this.registroForm.value).every(value => !value);
  }

  findAllActividad() {
    this.transaccionalService
      .listaactividaes()
      .subscribe((res: any) => {
        this.actividades = res;
      }
      )
  }

  registrarTransaccional() {
    this.spinner.show(); // Mostrar spinner antes del registro
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      const data = this.registroForm.getRawValue();

      const transformedData = {
        id_programs: data.id_programs,
        id_activities: data.id_activities.map((id: any) => ({ id_activities: id })),
        date_asignation: data.date_asignation,
        direction: data.direction
      };
      this.transaccionalService.registrar(transformedData).subscribe(
        () => {
      
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro completado con éxito',
            showConfirmButton: false,
            timer: 3000, // Duración más larga para una sensación más elegante
            toast: true, // Usa el modo "toast"
            background: '#40c2d3', // Color de fondo personalizado
            color: '#ffffff', // Texto en color blanco para contraste
            customClass: {
              popup: 'custom-toast' // Clase personalizada para estilos adicionales
            }
          });
          this.registroForm.reset();
          this.onNoClick();
          this.spinner.hide(); // Ocultar spinner después del registro
        },
        
        (error) => {
      
          Swal.fire({
            position: 'top-end', // Posición en la esquina superior derecha
            icon: 'error',
            title: 'Error al realizar el registro',
            showConfirmButton: false,
            timer: 1500 // Duración de la alerta
          });
          console.error('Error en la asignación', error);
          this.registroError = true;
          this.spinner.hide(); // Ocultar spinner después del registro
        }
      );

    });
  }

  selectAllOrDeselectAll() {
    const idTeenControl = this.registroForm.get('id_activities');

    if (idTeenControl) {  // Verifica que idTeenControl no sea nulo
      const allTeenIDs = this.actividades.map(teen => teen.id);

      if (this.isAllSelected()) {
        // Si el checkbox está marcado, deselecciona todos los adolescentes
        idTeenControl.patchValue([]);
      } else {
        // Si el checkbox no está marcado, selecciona todos los adolescentes
        idTeenControl.patchValue(allTeenIDs);
      }
    }
  }

  isAllSelected(): boolean {
    const idTeenControl = this.registroForm.get('id_activities');
    const allTeenIDs = this.actividades.map(teen => teen.id);
    if (idTeenControl) {  
      return JSON.stringify(idTeenControl.value) === JSON.stringify(allTeenIDs);
    }
    return false;  
  }


  initAsignationForm() {
    this.registroForm = this.fb.group({
      id: [null],
      id_programs: ["", Validators.required],
      id_activities: [[], Validators.required],
      date_asignation: ["", Validators.required],
      direction: ["", Validators.required],
      name_programs: ["", Validators.required],
      name_activities: ["", Validators.required],
      active: ["A"],
    });
    if (this.transaccionalService.asignationSelected) {
      this.registroForm.patchValue(
        this.transaccionalService.asignationSelected
      );
    }
  }

  ngOnDestroy(): void {
    this.transaccionalService.asignationSelected = undefined;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
