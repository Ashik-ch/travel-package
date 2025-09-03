import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiaMapComponent } from './india-map.component';

describe('IndiaMapComponent', () => {
  let component: IndiaMapComponent;
  let fixture: ComponentFixture<IndiaMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndiaMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndiaMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
