import { Component, OnInit } from '@angular/core';
import { OperativeUnitService } from 'src/app/components/component-funcionality/services/operativeUnit/operative-unit.service';

@Component({
  selector: 'app-operative-unit-dashboard-info',
  templateUrl: './operative-unit-dashboard-info.component.html',
  styleUrls: ['./operative-unit-dashboard-info.component.scss'],
})
export class OperativeUnitDashboardInfoComponent implements OnInit {
  operativeUnitData: any[] = [];
  funcionaryData: any[] = [];

  constructor(public _operativeUnitService: OperativeUnitService) {}

  ngOnInit(): void {
    this.findAllDataCompleteOperativeUnit();
    this.findAllDataCompleteFuncionary();
  }

  findAllDataCompleteOperativeUnit() {
    this._operativeUnitService
      .findAllDataOperativeUnit()
      .subscribe((dataOperativeUnit: any) => {
        this.operativeUnitData = dataOperativeUnit;
      });
  }

  findAllDataCompleteFuncionary() {
    this._operativeUnitService
      .findAllDataFuncionary()
      .subscribe((dataFuncionary: any) => {
        //console.log('Funcionarios: ', dataFuncionary);
        this.funcionaryData = dataFuncionary;
      });
  }

  getDataFuncionaryInBD(id_funcionary: number) {
    const funcionary = this.funcionaryData.find(
      (item) => item.id_funcionary === id_funcionary
    );
    if (funcionary) {
      return `${funcionary.name} ${funcionary.surnameFather} ${funcionary.surnameMother}`;
    } else {
      return 'El funcionario asignado no fue encontrado.';
    }
  }
}
