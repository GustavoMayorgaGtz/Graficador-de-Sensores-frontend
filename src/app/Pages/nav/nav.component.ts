import { Component, OnDestroy, OnInit } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  //public dataInformation: number[]= [85, 72, 78, 75, 77, 75];
  //public dataInformation1: number[]= [45, 102, 78, 35, 77, 70];
  public dataInformation: number[]= [85, 15];
  lineChartData  = [
    { data: this.dataInformation, label: 'Valores del sensor', backgroundColor: "rgb(24,27,31)", borderColor: "rgb(115,191,105)", 
    pointBorderColor: "rgb(24,27,31)", hoverBorderColor:"rgb(182,209,6)", pointBackgroundColor: "rgb(24,27,31)", borderWidth: 5},  
  ];
 // { data: this.dataInformation1, label: 'Valores del sensor 2' },

  lineChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis'];
 
  lineChartLegend = true;
  lineChartPlugins = [
  ];
  lineChartType = 'bar';
  //public chartColors:Color[] = [];
  public chartColors:Array<any> =[
      'rgba(225,10,24,0.2)',
      'rgba(11,255,20,1)',
      'rgba(111,200,200,1)',
      '#fff',
      '#fff',
      'rgba(200,100,10,0.8)'
  ];
  /************************** */
  public graph = {
    data: [
        { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
        { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
    ],
    layout: {width: 320, height: 240, title: 'A Fancy Plot'}
};


  // chartData = [
  //   {
  //     data: [330],
  //     label: 'Account A'
  //   },
  //   {
  //     data: [120],
  //     label: 'Account B'
  //   },
  //   {
  //     data: [45],
  //     label: 'Account C'
  //   }
  // ];

  public isInicio = false;
  public isAdd = false;
  public isTest = false;
  public isGraph = false;
  public isContact = false;

  public intervalUpdate: any;

  /****************** */
  public type:string = "line";

  /****************** */

  constructor() { }
  ngOnDestroy(): void {
    clearInterval(this.intervalUpdate);
  }
 
  //  showData(): void {
  //   console.log(this.chart.data.datasets[0]);
  //   this.chart.update();
  //   this.chart.render();
  //   /*this.getSensoresData.getData().subscribe(response => {
  //       //console.log(response);
        
    
  //       //let chartTime: any = new Date();
  //      // chartTime = chartTime.getHours() + ':' + ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() : chartTime.getMinutes()) + ':' + ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());
  //       //this.chart.data.labels.push(chartTime);
  //    //   this.chart.data.datasets[0].data.push(response);
  //    //   this.chart.update();
  //      /* if(this.chart.data.labels.length > 15) {
  //         this.chart.data.labels.shift();
  //         this.chart.data.datasets[0].data.shift();
  //   }
  //   }, error => {
  //    console.error("ERROR: Unexpected response");
  //   });*/
  // }
     
  ngOnInit(): void {
 
  }

  ButtonInicio() {
    this.isInicio = true;
    this.isAdd = false;
    this.isTest = false;
    this.isGraph = false;
    this.isContact = false;
  }
  ButtonAdd() {
    this.isInicio = false;
    this.isAdd = true;
    this.isTest = false;
    this.isGraph = false;
    this.isContact = false;
  }
  ButtonTest() {
    this.isInicio = false;
    this.isAdd = false;
    this.isTest = true;
    this.isGraph = false;
    this.isContact = false;
  }

  ButtonGraph() {
    this.isInicio = false;
    this.isAdd = false;
    this.isTest = false;
    this.isGraph = true;
    this.isContact = false;
  }
  ButtonContact(){
    this.isInicio = false;
    this.isAdd = false;
    this.isTest = false;
    this.isGraph = false;
    this.isContact = true;
  }

}
