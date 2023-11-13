import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumProductComponent } from './premium-product.component';

describe('PremiumProductComponent', () => {
  let component: PremiumProductComponent;
  let fixture: ComponentFixture<PremiumProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiumProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiumProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
