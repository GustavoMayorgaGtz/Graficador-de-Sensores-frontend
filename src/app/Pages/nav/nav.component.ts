import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public isInit = false;
  public isAdd = false;
  public isTest = false;
  public isGraph = false;
  public isContact = false;
  public intervalUpdate: any;
  /*********Arreglos que se pasan como parametros  **********/
  public ids: number[];
  public nameSensors !: string[];
  public backgroundColors !: string[];
  public borderColor !: string[];
  public typeGraphic !: string[];  
  public typeGraphic2 !: string[];
  public pointBackgroundColor !: string[];
  public hoverBorderColor !: string[];
  public pointBorderColor !: string[];
  public SizePoint !: number[];

  /*****Estilos*****/
  public heightScreen: number = 0;

  constructor() {
    this.ids = [
      0,
      1,
      2
    ];

    this.nameSensors = [
      "Sensor2",
      "Sensor2",
      "Sensor2"
    ];

    this.backgroundColors = [
      "rgba(32, 168, 16, 0.2)",
      "rgba(216, 112, 8, 0.5)",
      "['red','green','blue','purple','yellow','brown','magenta','cyan']"
    ];

    this.borderColor = [
      "rgb(32, 168, 16)",
      "rgba(176, 93, 10, 0.5)",
      "blue"
    ];


    this.typeGraphic = [
      'line',
      'bar',
      'radar'
    ];
    this.typeGraphic2 = [
      'area',
      'bar',
      'radialBar'
    ];


    this.pointBackgroundColor = [
      "rgb(32, 168, 16)",
      "pink",
      "['red','green','blue','purple','yellow','brown','magenta','cyan']"
    ];

    this.hoverBorderColor = [
      "white",
      "green",
      "",
    ];

    this.pointBorderColor = [
      "white",
      "purple",
      ""
    ]

    this.SizePoint = [
      2, 
      1, 
      2
    ]

    switch (localStorage.getItem("position_nav")) {
      case "Inicio": {
        this.ButtonInit();
        break;
      }
      case "Add": {
        this.ButtonAdd();
        break;
      }
      case "Test": {
        this.ButtonTest();
        break;
      }
      case "Graph": {
        this.ButtonGraph();
        break;
      }
      case "Contact": {
        this.ButtonContact();
        break;
      }
      default: {
        this.ButtonInit();
        break;
      }


    }
  }

  ngOnInit(): void {
 
  }





  ButtonInit() {
    localStorage.setItem("position_nav", "Inicio");

    this.isInit = true;
    this.isAdd = false;
    this.isTest = false;
    this.isGraph = false;
    this.isContact = false;
  }

  ButtonAdd() {
    localStorage.setItem("position_nav", "Add");
    this.isInit = false;
    this.isAdd = true;
    this.isTest = false;
    this.isGraph = false;
    this.isContact = false;
  }
  ButtonTest() {
    localStorage.setItem("position_nav", "Test");
    this.isInit = false;
    this.isAdd = false;
    this.isTest = true;
    this.isGraph = false;
    this.isContact = false;
  }

  ButtonGraph() {
    localStorage.setItem("position_nav", "Graph");
    this.isInit = false;
    this.isAdd = false;
    this.isTest = false;
    this.isGraph = true;
    this.isContact = false;
  }
  ButtonContact() {
    localStorage.setItem("position_nav", "Contact");
    this.isInit = false;
    this.isAdd = false;
    this.isTest = false;
    this.isGraph = false;
    this.isContact = true;
  }



  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.ids, event.previousIndex, event.currentIndex);
    moveItemInArray(this.nameSensors, event.previousIndex, event.currentIndex);
    moveItemInArray(this.typeGraphic, event.previousIndex, event.currentIndex);
    moveItemInArray(this.backgroundColors, event.previousIndex, event.currentIndex);
    moveItemInArray(this.borderColor, event.previousIndex, event.currentIndex);
    moveItemInArray(this.pointBackgroundColor, event.previousIndex, event.currentIndex);
    moveItemInArray(this.hoverBorderColor, event.previousIndex, event.currentIndex);
    moveItemInArray(this.pointBorderColor, event.previousIndex, event.currentIndex);
    moveItemInArray(this.SizePoint, event.previousIndex, event.currentIndex);
  }
}

