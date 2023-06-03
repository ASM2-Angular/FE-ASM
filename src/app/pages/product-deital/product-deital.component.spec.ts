import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDeitalComponent } from './product-deital.component';

describe('ProductDeitalComponent', () => {
  let component: ProductDeitalComponent;
  let fixture: ComponentFixture<ProductDeitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDeitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDeitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
