import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TeenService } from '../service/teen.service';

@Component({
  selector: 'app-teen-form',
  templateUrl: './teen-form.component.html',
  styleUrls: ['./teen-form.component.scss']
})
export class TeenFormComponent implements OnInit, OnDestroy{

  adolescenteForm: FormGroup = new FormGroup({});

  constructor(public dialogRef: MatDialogRef<TeenFormComponent>,
      private fb: FormBuilder,
      public teenService: TeenService) {}

  ngOnInit(): void {
    this.initadolescenteForm();
  }

  onClose():void {
    this.dialogRef.close();
  }

  initadolescenteForm(){
    this.adolescenteForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required , Validators.pattern('[A-Za-z ]+')]],
      father_surname: ['', [Validators.required , Validators.pattern('[A-Za-z ]+')]],
      mother_surname: ['', [Validators.required , Validators.pattern('[A-Za-z ]+')]],
      document_type: ['', Validators.required],
      document_number: ['', Validators.required],
      birthdate: ['', Validators.required],
      cell_phone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      address: ['', [Validators.required , Validators.pattern('[A-Z,a-z,0-9 ]+')]],
      gender: ['', Validators.required],
      state: ['A'],
      crime_committed: ['', [Validators.required , Validators.pattern('[A-Za-z ]+')]],
      attorney: ['', [Validators.required , Validators.pattern('[A-Za-z ]+')]]
    });

    if (this.teenService.adolescenteSelected){
      this.adolescenteForm.patchValue(this.teenService.adolescenteSelected);
    }
  }

  saveAdolescente() {
    if (this.teenService.adolescenteSelected) {
      this.updateAdolescente();
    } else {
      this.createAdolescente();
    }
  }

  createAdolescente() {
    console.log('Datos de Entidades Cooperantes:', this.adolescenteForm.value)
    this.teenService.create(this.adolescenteForm.value).subscribe(res => {
      console.log('Se guardo correctamente:', res);
      this.adolescenteForm.reset();
      this.onClose();
    })
  }

  updateAdolescente() {
    console.log('Datos de Entidades Cooperantes:', this.adolescenteForm.value)
    this.teenService.update(this.adolescenteForm.value).subscribe(res => {
      console.log('Se actualizó correctamente', res);
      this.adolescenteForm.reset();
      this.onClose();
    })
  }

  ngOnDestroy() {
    this.teenService.adolescenteSelected = undefined;
  }

  get nombre(){
    return this.adolescenteForm.get(`name`)?.invalid && this.adolescenteForm.get(`name`)?.touched;
  }

  get father_surname(){
    return this.adolescenteForm.get(`father_surname`)?.invalid && this.adolescenteForm.get(`father_surname`)?.touched;
  }

  get mother_surname(){
    return this.adolescenteForm.get(`mother_surname`)?.invalid && this.adolescenteForm.get(`mother_surname`)?.touched;
  }

  get address(){
    return this.adolescenteForm.get(`address`)?.invalid && this.adolescenteForm.get(`address`)?.touched;
  }

  get celular(){
    return this.adolescenteForm.get('cell_phone')?.invalid && this.adolescenteForm.get(`cell_phone`)?.touched;
  }

  get crime_committed(){
    return this.adolescenteForm.get('crime_committed')?.invalid && this.adolescenteForm.get(`crime_committed`)?.touched;
  }

  get attorney(){
    return this.adolescenteForm.get('attorney')?.invalid && this.adolescenteForm.get(`attorney`)?.touched;
  }
}
