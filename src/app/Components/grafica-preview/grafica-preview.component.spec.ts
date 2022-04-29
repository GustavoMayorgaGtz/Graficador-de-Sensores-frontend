import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaPreviewComponent } from './grafica-preview.component';

describe('GraficaPreviewComponent', () => {
  let component: GraficaPreviewComponent;
  let fixture: ComponentFixture<GraficaPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
