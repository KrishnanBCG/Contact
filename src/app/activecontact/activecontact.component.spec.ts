import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivecontactComponent } from './activecontact.component';

describe('ActivecontactComponent', () => {
  let component: ActivecontactComponent;
  let fixture: ComponentFixture<ActivecontactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivecontactComponent]
    });
    fixture = TestBed.createComponent(ActivecontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
