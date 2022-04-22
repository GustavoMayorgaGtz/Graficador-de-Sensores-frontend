import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficaComponent } from './grafica/grafica.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { GraficaApexComponent } from './grafica-apex/grafica-apex.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    GraficaComponent,
    GraficaApexComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgChartsModule,
    DragDropModule,
    ColorPickerModule,
    BrowserModule,
    NgApexchartsModule,
   
  ],
  exports: [
    GraficaComponent,
    GraficaApexComponent
  ]
})
export class ComponentsModuleModule { }
