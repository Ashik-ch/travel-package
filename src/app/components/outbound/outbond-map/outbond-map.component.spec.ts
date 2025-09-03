import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutbondMapComponent } from './outbond-map.component';

describe('OutbondMapComponent', () => {
  let component: OutbondMapComponent;
  let fixture: ComponentFixture<OutbondMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutbondMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutbondMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
