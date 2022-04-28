import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearVariableComponent } from './crear-variable.component';

describe('CrearVariableComponent', () => {
  let component: CrearVariableComponent;
  let fixture: ComponentFixture<CrearVariableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearVariableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
