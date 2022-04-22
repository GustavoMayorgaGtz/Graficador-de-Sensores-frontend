import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaApexComponent } from './grafica-apex.component';

describe('GraficaApexComponent', () => {
  let component: GraficaApexComponent;
  let fixture: ComponentFixture<GraficaApexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaApexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaApexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
