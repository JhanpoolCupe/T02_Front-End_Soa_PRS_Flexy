import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Transactional } from '../model/transacional.modal';
import { TransaccionalService } from '../service/transaccional.service';
import { MatDialog } from '@angular/material/dialog';
import { TransaccionalFormComponent } from '../transaccional-form/transaccional-form.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-transaccional-list',
  templateUrl: './transaccional-list.component.html',
  styleUrls: ['./transaccional-list.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
  
})
export class TransaccionalListComponent implements OnInit {
  fechaDesde!: Date;
  fechaHasta!: Date;

  estadoFiltrado: string = "A";
  transaccionesFiltradas: Transactional[] = [];

  nuevaTransaccional: Transactional = new Transactional();
  registroSeleccionado: Transactional = new Transactional();

  @ViewChild("actualizarDialog", { static: false })
  actualizarDialog!: TemplateRef<any>;

  constructor(
    private _transaccionalService: TransaccionalService,
    public dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>
    
  ) { 
    this.dateAdapter.setLocale('en-GB'); // O el locale que prefieras
  }

  ngOnInit(): void {
    this.findAllDataTransaccional();
    this.filtrarTransaccionesPorEstado();
    this.actualizarEstadoRegistros();
    setInterval(() => {
      this.actualizarEstadoRegistros();
    }, 30000);
  }

  filtrarPorFecha() {
    if (this.fechaDesde && this.fechaHasta) {
      this.transaccionesFiltradas = this.transaccionesFiltradas.filter(transaccion => {
        const fechaTransaccion = new Date(transaccion.date_asignation).getTime();
        return fechaTransaccion >= this.fechaDesde.getTime() && fechaTransaccion <= this.fechaHasta.getTime();
      }); 
      
    }
   
  }
  
  
  filtrarTransaccionesPorEstado() {
    this._transaccionalService.listarPorEstado(this.estadoFiltrado).subscribe(
      (res: Transactional[]) => {
        this.transaccionesFiltradas = res;
      },
      (error) => {
        console.error('Error al obtener las transacciones:', error);
      }
    );
  }


  cambiarEstado(estado: string) {
    this.estadoFiltrado = estado;
    this.filtrarTransaccionesPorEstado();
  }

  findAllDataTransaccional() {
   
    this._transaccionalService
      .listarPorEstado("A")
      .subscribe((res: any) => (this.transaccionesFiltradas = res));

  }
  
  findAllDataTransaccionalInactivo() {
   
    this._transaccionalService
      .listarPorEstado("I")
      .subscribe((res: any) => (this.transaccionesFiltradas = res));
   
  }

  navigateToForm() { }

  openDialog(): void {
    const dialogRef = this.dialog.open(TransaccionalFormComponent, {
      width: "35%",
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.filtrarTransaccionesPorEstado();
    });
  }

  actualizarEstadoRegistros() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
  
    this.transaccionesFiltradas.forEach((trans, index) => {
      const fechaTransaccion = new Date(trans.date_asignation);
      if (trans.id !== undefined) {
        if (fechaTransaccion < hoy) {
          if (trans.active === "A") {
            trans.active = "I";
            console.log(trans.id)
            this._transaccionalService.actualizarRegistro(trans.id, trans).subscribe(
              (res: Transactional) => {
                console.log('Registro actualizado:', res);
                this.transaccionesFiltradas[index] = res;
                this.findAllDataTransaccional();
              },
              (error) => {
                console.error('Error al actualizar el registro:', error);
              }
            );
          }
        } else {
          if (trans.active === "I") {
            trans.active = "A";
  
            this._transaccionalService.actualizarRegistro(trans.id, trans).subscribe(
              (res: Transactional) => {
                console.log('Registro actualizado:', res);
                this.transaccionesFiltradas[index] = res;
                this.findAllDataTransaccional();
              },
              (error) => {
                console.error('Error al actualizar el registro:', error);
              }
            );
          }
        }
      } else {
        console.error('El ID del registro es undefined.');
      }
    });
  }
  
  
  

  actualizarRegistro(transaccional: Transactional) {
    this.registroSeleccionado = { ...transaccional };
    this.dialog.open(this.actualizarDialog);
  }

  cerrarDialogo() {
    this.dialog.closeAll();
  }

  guardarCambios() {
    const idRegistro = this.registroSeleccionado.id;
    if (idRegistro !== undefined) {
      this._transaccionalService.actualizarRegistro(idRegistro, this.registroSeleccionado).subscribe(
        (res: Transactional) => {
          this.cerrarDialogo();
          this.findAllDataTransaccional();
        })
        
    } else {
      console.error('Error al actualizar el registro:');
    }
  }

  restaurarRegistro(transaccional: Transactional) {
    if (transaccional.id !== undefined) {
      transaccional.active = "A"
      this._transaccionalService.actualizarRegistro(transaccional.id, transaccional).subscribe(
        (res: Transactional) => {
          console.log('Registro restaurado:', res);
          const index = this.transaccionesFiltradas.findIndex(item => item.id === res.id);
            this.transaccionesFiltradas[index] = res;
            this.findAllDataTransaccionalInactivo();
        },
        (error) => {
          console.error('Error al restaurar el registro:', error);
        }
      );
    } else {
      console.error('El ID del registro es undefined.');
    }
  }

  mostrarBotonRestaurar(estado: string) {
    return estado === 'I';
  }

  mostrarBotonActualizar(estado: string) {
    return estado === 'A';
  }
}
