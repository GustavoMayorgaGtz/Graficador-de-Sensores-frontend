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
import { GraficaRadialBarComponent } from './grafica-radial-bar/grafica-radial-bar.component';
import { GraficaPreviewComponent } from './grafica-preview/grafica-preview.component';



@NgModule({
  declarations: [
    GraficaComponent,
    GraficaApexComponent,
    GraficaRadialBarComponent,
    GraficaPreviewComponent
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
    GraficaApexComponent,
    GraficaRadialBarComponent,
    GraficaPreviewComponent
  ]
})
export class ComponentsModuleModule { }
