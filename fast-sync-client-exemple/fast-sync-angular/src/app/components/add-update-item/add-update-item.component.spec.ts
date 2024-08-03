import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateItemComponent } from './add-update-item.component';

describe('AddUpdateItemComponent', () => {
  let component: AddUpdateItemComponent;
  let fixture: ComponentFixture<AddUpdateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
