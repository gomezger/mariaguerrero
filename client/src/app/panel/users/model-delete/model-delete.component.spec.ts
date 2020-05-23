import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDeleteComponent } from './model-delete.component';

describe('ModelDeleteComponent', () => {
  let component: ModelDeleteComponent;
  let fixture: ComponentFixture<ModelDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
