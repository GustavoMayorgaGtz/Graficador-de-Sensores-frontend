import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnyObject } from 'chart.js/types/basic';
import { Subscription } from 'rxjs';
import { GetInformationControllersService } from 'src/app/Services/get-information-controllers.service';

@Component({
  selector: 'app-crear-variable',
  templateUrl: './crear-variable.component.html',
  styleUrls: ['./crear-variable.component.css']
})
export class CrearVariableComponent implements OnInit, OnDestroy {

  public GetAllConexion?: Subscription;

  public nombres: string[] = [];
  public datos: any;
  public sensoresJson: any[] = [];
  public keysData: string[] = [];
  public dataSelect: any = {};
  public actualDataSensor: any[] = [];
  public dataView: number[] = [];
  constructor(private getInformationSensors: GetInformationControllersService) { }


  ngOnInit(): void {
    this.GetAllConexion = this.getInformationSensors.getAllDataConexiones().subscribe((data) => {
      if (data) {
        this.datos = data;
        console.log(data);
        //console.log(data.length);
        for (let i = 0; i < data.length; i++) {

          let dataActual = data[i];
          this.sensoresJson.push(dataActual);
          console.log("data actual: " + dataActual);
          this.nombres.push(dataActual.nombre);
        }
        console.log(this.nombres);
      }
    });
  }

  ngOnDestroy(): void {
    this.GetAllConexion?.unsubscribe();
  }

  getSensorKeysNameEvent(event: Event) {
    /*Funcion que nos sirve para obtener todas las keys de un json seleccionado de un array al presionar un boton*/
    this.keysData = [];
    let id = (event.target as Element).id;
    let idx = parseInt(id);
    let thisSensorData = this.sensoresJson[idx].data;
    this.actualDataSensor = thisSensorData;
    this.dataSelect = thisSensorData;
    let setsData = Object.keys(thisSensorData[0]);
    for (let i = 0; i < setsData.length; i++) {
      this.keysData.push(setsData[i]);
    }
  }

  getSensorDataEvent(event: Event) {
    /*Funcion que nos sirve para obtener todas las keys de un json seleccionado de un array al presionar un boton*/
    // console.log("datos seleccionados");
    // console.log(this.dataSelect);

    let id = (event.target as Element).id;
    let idx = parseInt(id);
    let thisSensorData = this.keysData[idx].toString();
    console.log("thisSensorData");
     console.log(thisSensorData);
    let size = this.actualDataSensor.length;
    console.log(size);
    console.log(this.actualDataSensor);
    let datosSeleccionados = [];
    for(let i = 0; i < size; i++)
    {
      let seleccion = this.actualDataSensor[i];
      datosSeleccionados.push(seleccion[thisSensorData]);
    }
    console.log("datos seleccionados");
    console.log(datosSeleccionados);


  }


}
