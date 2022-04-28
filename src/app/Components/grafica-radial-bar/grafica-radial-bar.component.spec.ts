import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaRadialBarComponent } from './grafica-radial-bar.component';

describe('GraficaRadialBarComponent', () => {
  let component: GraficaRadialBarComponent;
  let fixture: ComponentFixture<GraficaRadialBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaRadialBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaRadialBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
