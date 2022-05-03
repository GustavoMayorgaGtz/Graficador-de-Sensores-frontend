import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { GetInformationControllersService } from 'src/app/Services/get-information-controllers.service';

@Component({
  selector: 'app-grafica-preview',
  templateUrl: './grafica-preview.component.html',
  styleUrls: ['./grafica-preview.component.css']
})
export class GraficaPreviewComponent implements OnInit {
  public dataInformation : number[] = [12,321,534,342,213,213,5,343,34,32,24,523,534,532,532,432,432,200,32,100,324,732,2,45,452,4,32];
  lineChartData = [{
    data: this.dataInformation,
    label: 'Grafica',
    backgroundColor: "rgb(255,255,255)",
    borderColor: "rgb(255,255,255)",
    pointBorderColor: "rgb(255,255,255)",
    hoverBorderColor: "rgb(255,255,255)",
    pointBackgroundColor: "rgb(255,255,255)",
    borderWidth: 2,
  }];
  lineChartOptions = {
    fill: 'origin',
    responsive: true,
    backgroundColor: "['red','green','blue','purple','yellow','brown','magenta','cyan']",
    maintainAspectRatio: false,
    animation: false,
    options: {
      animation: {
        duration: 0
      }
    },
    scales: {
      y: {
        stacked: true,
        grid: {
          display: false,
          color: "rgba(255,255,255,1)"
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };
  barChartLabels: string[] = [];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'bar';

  /****************** */
  public type: string = "line";
  /****************** */
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

  public height: number = 0;


  /********************************************************************************************* */
  constructor(private sensorInformation: GetInformationControllersService, private sanitizer: DomSanitizer) {

    this.Style = sanitizer.bypassSecurityTrustStyle(this.Style);
        this.lineChartData = [
      {
        data: this.dataInformation,
        label: 'Grafica',
        backgroundColor:'rgba(32, 168, 16, 0.2)', // background donde se muestran las opciones o los valores "rgb(180, 206, 237)"
        borderColor: 'rgb(32, 168, 16)', //Color de la linea conectora "rgb(10, 83, 171)"
        pointBorderColor:"rgb(32, 168, 16)", //color del borde de los puntos
        hoverBorderColor: "white", //Es el fondo de los datos cuando haces hover sobre un nodo
        pointBackgroundColor:  "white", //Background del punto  
        borderWidth: this.SizePoint
      },
    ];
    this.barChartLabels = (this.dataInformation as unknown as string[]);
  }
  /********************************************************************************************* */
  ngOnInit(): void {

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
    })

    setInterval(() => {
      if (this.widthLienzo < 300 && this.heightLienzo < 300) {
        this.widthLienzo = 320;
        this.heightLienzo = 320;
        this.isResizeHeight = false;
        this.isResizeWidth = false;
      }
      this.getHeight();
    }, 0);

    this.setPositionInit();
    this.widthLienzo = 600;
    this.widthLienzoPorcentaje = (this.widthLienzo * 100) / this.browserWidth;
    this.heightLienzo = 500;
  }
  /********************************************************************************************* */
  setPositionInit() {
    this.elementos = (document.querySelectorAll('.container_grafica') as NodeListOf<HTMLInputElement>);
    this.elementos[this.Id].style.top = this.CoordY + "px";
  }

   getHeight()
   {
     let windowsHeight = window.innerHeight+ window.scrollY;
     this.height = ((60 * windowsHeight)/100)-150;
   }
  ngOnDestroy() {
    this.getDataSensor?.unsubscribe();
  }


}

/********************************************************************************************* */