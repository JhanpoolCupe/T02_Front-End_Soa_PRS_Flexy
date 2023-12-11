import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsComponent } from './forms/forms.component';
import { DemoFlexyModule } from '../demo-flexy-module';
import { GridListComponent } from './grid-list/grid-list.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ProgressComponent } from './progress/progress.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { TeenPrincipalComponent } from './teen-principal/teen-principal.component';
import { EntidadesListComponent } from './entidades/entidades-list/entidades-list.component';
import { EntidadesFormComponent } from './entidades/entidades-form/entidades-form.component';
import { TeenListComponent } from './teen/teen-list/teen-list.component';
import { TeenFormComponent } from './teen/teen-form/teen-form.component';
import { DocumentoModalComponent } from './documento-modal/documento-modal/documento-modal.component';
import { NotificacionesListComponent } from './notificaciones/notificaciones-list/notificaciones-list.component';
import { NotificacionesFormComponent } from './notificaciones/notificaciones-form/notificaciones-form.component';
import { TransaccionalListComponent } from './transaccional/transaccional-list/transaccional-list.component';
import { TransaccionalFormComponent } from './transaccional/transaccional-form/transaccional-form.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FormularioComponent } from './formulario/formulario.component'
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
    imports: [
        CommonModule,
        FeatherModule.pick(allIcons),
        DemoFlexyModule,
        ButtonsComponent,
        SlideToggleComponent,
        SliderComponent,
        ToolbarComponent,
        ProgressSnipperComponent,
        SnackbarComponent,
        MenuComponent,
        TabsComponent,
        ExpansionComponent,
        ChipsComponent,
        ProgressComponent,
        FormsComponent,
        AlertsComponent,
        GridListComponent,
        TooltipsComponent,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
    ],
  exports: [
    AlertsComponent,
    FormsComponent,
    GridListComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ChipsComponent,
    ProgressComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    ButtonsComponent,
  ],
  declarations: [
    TeenPrincipalComponent,
    EntidadesListComponent,
    EntidadesFormComponent,
    TeenListComponent,
    TeenFormComponent,
    DocumentoModalComponent,
    NotificacionesListComponent,
    NotificacionesFormComponent,
    TransaccionalListComponent,
    TransaccionalFormComponent,
    ConfirmDialogComponent,
    FormularioComponent
  ]
})
export class ComponentsModule { }
