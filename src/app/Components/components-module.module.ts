import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficaComponent } from './grafica/grafica.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    GraficaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgChartsModule,
    DragDropModule,
    ColorPickerModule
  ],
  exports: [
    GraficaComponent
  ]
})
export class ComponentsModuleModule { }
