import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexResponsive,
  ApexDataLabels,
  ApexStroke,
  ApexPlotOptions,
  ApexFill,
  ApexNonAxisChartSeries
} from "ng-apexcharts";
import { redraw } from 'plotly.js';
import { Subscription } from 'rxjs';
import { GetInformationControllersService } from 'src/app/Services/get-information-controllers.service';

export type ChartOptions = {
  serie2: ApexNonAxisChartSeries;
  chartRadialBar: ApexChart;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  dataLabelsRadial: ApexDataLabels;
};

@Component({
  selector: 'app-grafica-radial-bar',
  templateUrl: './grafica-radial-bar.component.html',
  styleUrls: ['./grafica-radial-bar.component.css']
})
export class GraficaRadialBarComponent implements OnInit {
  /*********************************************************************************************************************/
  public data?: Object;
  public getDataSensor: Subscription | undefined;
  public dataSensor?: number[];
  public widthLienzo!: number;
  public widthLienzoPorcentaje !: number;
  public heightLienzo!: number;
  public heightLienzoPorcentaje !: number;
  public Nombre!: string;

  //Funciones de Resize en la grafica
  public isResizeWidth: boolean = false;
  public isResizeHeight: boolean = false;
  public stateResize: String = "";
  public CoordY !: number;
  public CoordX !: number;
  public browserWidth !: number;

  /********Definir Colores y Tipo de Grafica *******/
  @Input() Id  !: number;
  @Input() backgroundColor!: string;
  @Input() borderColor !: string;
  @Input() pointBorderColor !: string;
  @Input() hoverBorderColor !: string;
  @Input() pointBackgroundColor !: string;
  @Input() typeGraphic !: any;
  @Input() Style: any = "font-size: 12px;";
  @Input() NombreSensor !: string;
  @Input() SizePoint: number = 1;
  public elementos !: NodeListOf<HTMLInputElement>;


  
/****************Radial Bar default options */
    series2:ApexNonAxisChartSeries = [90];
    chartRadialBar:ApexChart = {
      zoom: {
        enabled: true,
        autoScaleYaxis: false,
        type: 'y'
      },
      width: "100%",
      height: "130%",
      type: "radialBar",
      offsetY: 50
      };

    plotOptions: ApexPlotOptions= {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track:{
          background: "#ABB2B9",
          strokeWidth: "50%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },
        hollow: {
          size: "70%",
          
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -50,
            show: true,
            color: "#ffffff",
            fontSize: "calc(10px + 1vw)"
          },
          value: {
            offsetY: -30,
            color: "#ccc",
            fontSize: "calc(10px + 1vw)",
            show: true
          }
        }
      }
    
    };
    labels: string[]=  ["Cricket"];
    fill: ApexFill = {
      type: "gradient",
      gradient: {
        gradientToColors: ["#C0392B"],
        shade: "dark",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: .7,
        opacityTo: 1,
        stops: [0, 50,100]
      }
    };
    
  
  

  /*********************************************************************************************************************/
  constructor(private sensorInformation: GetInformationControllersService, private sanitizer: DomSanitizer) {
    this.Style = sanitizer.bypassSecurityTrustStyle(this.Style);

  }
  /*********************************************************************************************************************/
  ngOnInit(): void {
    /*  let notificacion =  new Notification("prueba");
      Notification.requestPermission().then(function(permission) { 
        console.log(permission);
      });*/
    this.chartRadialBar = {
      zoom: {
        enabled: true,
        autoScaleYaxis: false,
        type: 'y'
      },
      width: "100%",
      height: "130%",
      type: "radialBar",
      offsetY: 50
      };
    this.browserWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      this.browserWidth = window.innerWidth;
      if (this.widthLienzo) {
        this.widthLienzo = (this.widthLienzoPorcentaje * this.browserWidth) / 100;
        if (this.browserWidth < 700) {
          this.widthLienzo = this.browserWidth - 50;
          this.heightLienzo = (350 * this.browserWidth) / 700;
        }
        if (this.widthLienzo < 300) {
          this.widthLienzo = 310;
          this.heightLienzo = 310;
        }
      }
      this.chartRadialBar = {
        zoom: {
          enabled: true,
          autoScaleYaxis: false,
          type: 'y'
        },
        width: "100%",
        height: "130%",
        type: "radialBar",
        offsetY: 50
        };
    })

    if (this.widthLienzo < 300 && this.heightLienzo < 300) {
      this.widthLienzo = 320;
      this.heightLienzo = 320;
      this.isResizeHeight = false;
      this.isResizeWidth = false;
    }

    this.setPositionInit();
    this.setPosicionLienzo();
    this.setPosicionLienzoVertical();

    this.ObtenerDatos();
    this.ObtenerDatosTiempoReal();

    window.addEventListener('mousemove', (event) => {
      console.log(event.pageX + "||" + event.clientX);
    })
    this.widthLienzo = 600;
    this.widthLienzoPorcentaje = (this.widthLienzo * 100) / this.browserWidth;
    this.heightLienzo = 500;
  }
  /*********************************************************************************************************************/
  setPositionInit() {
    this.elementos = (document.querySelectorAll('.container_grafica') as NodeListOf<HTMLInputElement>);
    this.elementos[this.Id].style.top = this.CoordY + "px";
  }
  /*********************************************************************************************************************/
  setPosicionLienzo() {
    window.addEventListener('mousemove', (event) => {
      const browserWidth = window.innerWidth;
      if (this.isResizeWidth) {
        window.addEventListener('click', () => {
          this.isResizeWidth = false;
          this.isResizeHeight = false;
        })
        /*********Width**********/
        this.chartRadialBar = {
          zoom: {
            enabled: true,
            autoScaleYaxis: false,
            type: 'y'
          },
          width: "100%",
          height: "130%",
          type: "radialBar",
          offsetY: 50
          };
    
        if (this.widthLienzo < 300 && this.heightLienzo < 300) {
          this.widthLienzo = 320;
          this.heightLienzo = 320;
          this.isResizeHeight = false;
          this.isResizeWidth = false;
        }

        if (this.widthLienzo < 300 && this.heightLienzo < 300) {
          this.widthLienzo = 320;
          this.heightLienzo = 320;
          this.isResizeHeight = false;
          this.isResizeWidth = false;
        } else if (this.widthLienzo < 300) {
          this.widthLienzo = 320;
          this.widthLienzoPorcentaje = parseInt(((this.widthLienzo * 100) / this.browserWidth).toString());
          this.isResizeWidth = false;
        } else {
          if (this.CoordX == 2) {
            this.widthLienzo = ((event.clientX - this.CoordX) + 100);
            this.widthLienzoPorcentaje = parseInt(((this.widthLienzo * 100) / this.browserWidth).toString());
          } else {
            this.widthLienzo = (event.clientX - this.CoordX);
            this.widthLienzoPorcentaje = parseInt(((this.widthLienzo * 100) / this.browserWidth).toString());
          }
        }
        if (this.widthLienzo > browserWidth || (this.widthLienzo + this.CoordX) > browserWidth) {
          this.widthLienzo = browserWidth;
          this.widthLienzoPorcentaje = parseInt(((this.widthLienzo * 100) / this.browserWidth).toString());
        }
      } else {
        this.widthLienzo = this.widthLienzo;
        this.widthLienzoPorcentaje = parseInt(((this.widthLienzo * 100) / this.browserWidth).toString());
        this.heightLienzo = this.heightLienzo;
      }
    })
  }
  /*********************************************************************************************************************/
  setPosicionLienzoVertical() {
    window.addEventListener('mousemove', (event) => {
      if (this.isResizeHeight) {
        window.addEventListener('click', () => {
          this.isResizeHeight = false;
          this.isResizeWidth = false;
        })
        if (this.widthLienzo < 300 && this.heightLienzo < 300) {
          this.isResizeHeight = false;
          this.isResizeWidth = false;
        } else if (this.heightLienzo < 300) {
          this.heightLienzo = 320;
          this.isResizeHeight = false;
        } else {
          this.heightLienzo = (event.pageY) - this.CoordY;
        }
      } else {
        this.widthLienzo = this.widthLienzo;
        this.heightLienzo = this.heightLienzo;
      }
    })
  }
  /*********************************************************************************************************************/
  getCoordenada(element: HTMLElement) {
    var scroll = window.scrollY;
    this.CoordY = (element.getBoundingClientRect().top + scroll);
    this.CoordX = (element.getBoundingClientRect().x);
  }
  /*********************************************************************************************************************/
  defineSizeOnY() {
    this.isResizeHeight = true;
    this.isResizeWidth = true;
  }
  /*********************************************************************************************************************/
  defineSizeOffY() {
    this.isResizeHeight = false;
    this.isResizeWidth = false;
    this.widthLienzo = this.widthLienzo;
    this.heightLienzo = this.heightLienzo;
  }
  /********************************************************************************************* */
  ObtenerDatosTiempoReal() {
    setInterval(() => {
      this.ObtenerDatos();
    }, 10000);
  }
  ObtenerDatos() {
    this.getDataSensor = this.sensorInformation.getDataSensor({ "name": this.NombreSensor }).subscribe((getData) => {

      this.dataSensor = getData.data.map(Number);
      this.Nombre = getData.nombre;
      if (this.dataSensor) {
          this.configuracionRadialBar();
      }
    })


  }

  configuracionRadialBar() {
    if (this.dataSensor) {
 

    }
  }
}

/********************************************************************************************* */