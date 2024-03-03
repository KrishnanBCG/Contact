import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivecontactComponent } from './inactivecontact.component';

describe('InactivecontactComponent', () => {
  let component: InactivecontactComponent;
  let fixture: ComponentFixture<InactivecontactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InactivecontactComponent]
    });
    fixture = TestBed.createComponent(InactivecontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
