import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtagComponent } from './viewtag.component';

describe('ViewtagComponent', () => {
  let component: ViewtagComponent;
  let fixture: ComponentFixture<ViewtagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewtagComponent]
    });
    fixture = TestBed.createComponent(ViewtagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
