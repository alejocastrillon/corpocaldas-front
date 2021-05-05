import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAccessRequestComponent } from './register-access-request.component';

describe('RegisterAccessRequestComponent', () => {
  let component: RegisterAccessRequestComponent;
  let fixture: ComponentFixture<RegisterAccessRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAccessRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAccessRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
