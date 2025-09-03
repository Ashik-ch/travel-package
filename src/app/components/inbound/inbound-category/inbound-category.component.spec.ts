import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboundCategoryComponent } from './inbound-category.component';

describe('InboundCategoryComponent', () => {
  let component: InboundCategoryComponent;
  let fixture: ComponentFixture<InboundCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InboundCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InboundCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
