import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PositionHelper } from '@swimlane/ngx-charts/lib/common/tooltip/position';
import { ElementChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import { GetInformationControllersService } from 'src/app/Services/get-information-controllers.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit, OnDestroy {

  public dataInformation?: number[];
  lineChartData = [{
    data: this.dataInformation,
    label: 'Grafica',
    backgroundColor: "rgb(255,255,255)",
    borderColor: "rgb(255,255,255)",
    pointBorderColor: "rgb(255,255,255)",
    hoverBorderColor: "rgb(255,255,255)",
    pointBackgroundColor: "rgb(255,255,255)",
    borderWidth: 2
  }];
  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
  barChartLabels: string[] = ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis'];
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
  public heightLienzo!: number;
  public Nombre!: string;

  //Funciones de Resize en la grafica
  public isResizeWidth: boolean = false;
  public isResizeHeight: boolean = false;
  public stateResize: String = "";
  public CoordY !: number;
  public CoordX !: number;
 /* public isChangePosition: boolean = false;
  public isPositionX: boolean = false;
  public isPositionY: boolean = false;
  public SizeStyle !: any;*/
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


  public elementos !: NodeListOf<HTMLInputElement>;




  constructor(private sensorInformation: GetInformationControllersService, private sanitizer: DomSanitizer) {

    this.Style = sanitizer.bypassSecurityTrustStyle(this.Style);
  }

  ngOnInit(): void {
    this.setPositionInit();
  //  this.changePositionGraphic();
    this.setPosicionLienzo();
    this.setPosicionLienzoVertical();
    this.getDataSensor = this.sensorInformation.getDataSensor({ "name": this.NombreSensor }).subscribe((getData) => {
      this.dataSensor = getData.data.map(Number);
      this.Nombre = getData.nombre;
      //console.log(this.dataSensor);
      if (this.dataSensor) {
        this.lineChartData = [
          {
            data: this.dataSensor, label: getData.nombre,
            backgroundColor: this.backgroundColor, // background donde se muestran las opciones o los valores "rgb(180, 206, 237)"
            borderColor: this.borderColor, //Color de la linea conectora "rgb(10, 83, 171)"
            pointBorderColor: "rgb(34, 48, 66  )", //color del borde de los puntos
            hoverBorderColor: "rgb(180, 206, 237)", //Es el fondo de los datos cuando haces hover sobre un nodo
            pointBackgroundColor: "rgb(180, 206, 237)", //Background del punto  
            borderWidth: 4
          },
        ];
        this.barChartLabels = this.dataSensor.map(String);
      }
    })

    window.addEventListener('mousemove', (event) => {
      console.log(event.pageX+"||"+event.clientX);
    })

    this.widthLienzo = 600;
    this.heightLienzo = 500;
  }

  setPositionInit() {
    this.elementos = (document.querySelectorAll('.container_grafica') as NodeListOf<HTMLInputElement>);
    this.elementos[this.Id].style.top = this.CoordY + "px";
  }


  setPosicionLienzo() {
    window.addEventListener('mousemove', (event) => {

      const browserWidth = window.innerWidth;
      if (this.isResizeWidth) {
        window.addEventListener('click', () => {
          this.isResizeWidth = false;
          this.isResizeHeight = false;
        })
        /*********Width**********/
        if (this.widthLienzo < 300) {
          this.widthLienzo = 350;
          this.isResizeWidth = false;
        } else {
          // console.log("X: " + event.clientX);
          if (this.CoordX == 2) {
            this.widthLienzo = ((event.clientX - this.CoordX) + 100);
          } else {
            this.widthLienzo = (event.clientX - this.CoordX);
          }

        }
        if (this.widthLienzo > browserWidth || (this.widthLienzo + this.CoordX) > browserWidth) {
          this.widthLienzo = browserWidth;
        }
      } else {
        this.widthLienzo = this.widthLienzo;
        this.heightLienzo = this.heightLienzo;
      }
    })
  }

  setPosicionLienzoVertical() {

    window.addEventListener('mousemove', (event) => {
      if (this.isResizeHeight) {
        window.addEventListener('click', () => {
          this.isResizeHeight = false;
          this.isResizeWidth = false;
        })

        if (this.heightLienzo < 300) {
          this.heightLienzo = 350;
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

  getCoordenada(element: HTMLElement) {
    var scroll = window.scrollY;
    //alert("Coordenada del elemento: "+element.getBoundingClientRect().top+ " || El scroll es: " + scroll + " || tamaño del elemento en height: "+ element.getBoundingClientRect().height);
    this.CoordY = (element.getBoundingClientRect().top + scroll);
    this.CoordX = (element.getBoundingClientRect().x);
    console.log("Coordenada X: " + this.CoordX);
    console.log("Coordenada Y: " + this.CoordY);
    console.log("Width: " + element.getBoundingClientRect().width);
    console.log("Height: " + element.getBoundingClientRect().height);
  }


  // definePositionOnX() {
  //   this.isResizeWidth = true;
  //   this.isResizeHeight = false;
  // }
  // definePositionOffX() {
  //   this.isResizeWidth = false;
  //   this.isResizeHeight = false;
  //   this.widthLienzo = this.widthLienzo;
  //   this.heightLienzo = this.heightLienzo;
  // }
  defineSizeOnY() {
    this.isResizeHeight = true;
    this.isResizeWidth = true;
  }
  defineSizeOffY() {
    this.isResizeHeight = false;
    this.isResizeWidth = false;
    this.widthLienzo = this.widthLienzo;
    this.heightLienzo = this.heightLienzo;
  }
  /*definePositionOn() {
    this.isChangePosition = true;
    
    this.isPositionX = true;
    this.isPositionY = true;
  }
  definePositionOff() {
    this.isChangePosition = false;
    this.isPositionX = false;
    this.isPositionY = false;
  }
*/

 /* changePositionGraphic() {
    window.addEventListener('mousemove', (event) => {
      if (this.isChangePosition) {
        window.addEventListener('click',() => {
          this.definePositionOff();
        })
        console.log(this.Id);
        let elemento = this.elementos[this.Id];
        let actualWidth = elemento.getBoundingClientRect().width;
        let actualHeight = elemento.getBoundingClientRect().height;
        let actualX = elemento.getBoundingClientRect().x;
        let actualY = elemento.getBoundingClientRect().y;
        let X = event.pageX;
        let Y = event.pageY;
        console.log("coordenada X del Objeto: " + actualX);
        console.log("coordenada Y del Objeto: " + actualY);
        console.log("coordenada X del mouse en la pagina: " + X);
        console.log("coordenada X del mouse en la pagina: " + Y);
        console.log("width del objeto: " + actualWidth);
        let posicionFinalX = X - (actualWidth);
        //alert(posicionFinalX);
        elemento.style.left = posicionFinalX + "px";
        let posicionFinalY = (Y - 120);
        this.SizeStyle = `
        position: relative; width: 100%; height: 100%;
        left: ${posicionFinalX}px;
        top: ${posicionFinalY}px;
         `;
        this.SizeStyle = this.sanitizer.bypassSecurityTrustStyle(this.SizeStyle);


      }
    })
  }*/
  ngOnDestroy() {
    this.getDataSensor?.unsubscribe();
  }

}
