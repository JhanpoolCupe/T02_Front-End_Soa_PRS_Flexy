import { Component, OnInit } from '@angular/core';
import { Teen } from '../model/teen.model';
import { MatDialog } from '@angular/material/dialog';
import { TeenService } from '../service/teen.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TeenFormComponent } from '../teen-form/teen-form.component';
import { DocumentoModalComponent } from '../../documento-modal/documento-modal/documento-modal.component';

@Component({
  selector: 'app-teen-list',
  templateUrl: './teen-list.component.html',
  styleUrls: ['./teen-list.component.scss']
})
export class TeenListComponent implements OnInit{

  dataSource: Teen [] = [];
  estadoFiltrado: string = 'Todos';
  estadoActual: string = 'Activo';
  bsModalRef: BsModalRef | undefined;

constructor(public dialog: MatDialog, private teenService: TeenService,
  private modalService: BsModalService){}

 ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.teenService
      .findAll()
      .subscribe((res) => (this.dataSource = res));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TeenFormComponent, {
      width: '35%'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('La modal ha sido cerrada');
      this.listar();
    });
  }

  editarTeen(adolescente: Teen){
    this.teenService.adolescenteSelected = adolescente;
    this.openDialog();
  }

  deleteTeen(id: string){
    this.teenService.delete(id).subscribe((res) => {
      console.log('Se elimino el adolescente' , res);
      this.listar();
    });
  }

  listar(){
    this.teenService.findAll().subscribe((res: Teen[]) =>{
      console.log(res);
      this.dataSource = this.estadoFiltrado === 'Todos'
        ? res
        : res.filter((adolescente) => adolescente.state === this.estadoFiltrado);
    });
  }

  activarAdolescente(id: string): void{
    this.teenService.activarAdolescente(id).subscribe(() =>{
      console.log('Entidad activada correctamente');
      this.listar();
    });
  }

  openDocumentoModal(dni:string) {
    const initialState = {
      dni:dni
    };

    const modalConfig = {
      class: 'modal-xl', 
      initialState
    };
    this.bsModalRef = this.modalService.show(DocumentoModalComponent, modalConfig);
  }
}
