import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './Pages/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { ColorPickerModule } from 'ngx-color-picker';
import { CommonModule } from '@angular/common';
import { ComponentsModuleModule } from './Components/components-module.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgApexchartsModule} from 'ng-apexcharts';
import { CrearVariableComponent } from './Pages/crear-variable/crear-variable.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CrearVariableComponent
  ],
  imports: [
    ComponentsModuleModule,
    HttpClientModule,
    BrowserModule,
    NgApexchartsModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgChartsModule,
    ColorPickerModule,
    DragDropModule
  ],
  providers: [CookieService, Document],
  bootstrap: [AppComponent]
})
export class AppModule { }
