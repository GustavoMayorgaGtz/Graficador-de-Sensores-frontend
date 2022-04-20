import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop'


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
  public ids : number[];
  public nameSensors !: string[];
  public backgroundColors !: string[];
  public borderColor !: string[];
  public typeGraphic !: string[];
  

  constructor() {
    this.ids = [0,1,2];
    this.nameSensors = ["Sensor1", "Sensor2","Sensor2"];
    this.backgroundColors = ["rgb(10, 83, 171)","rgb(22, 131, 11)","rgb(22, 50, 11)"];
    this.borderColor = ["rgb(34, 48, 66)","rgb(23, 155, 31)","rgb(12, 55, 233)"];
    this.typeGraphic = [ 'line', 'bar','pie'];

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
  //  moveItemInArray(this.backgroundColors, event.previousIndex, event.currentIndex); 
    
     moveItemInArray(this.ids, event.previousIndex, event.currentIndex);
     moveItemInArray(this.nameSensors, event.previousIndex, event.currentIndex);
     moveItemInArray(this.typeGraphic, event.previousIndex, event.currentIndex);
     moveItemInArray(this.backgroundColors, event.previousIndex, event.currentIndex);
     moveItemInArray(this.borderColor, event.previousIndex, event.currentIndex);
  }
}

