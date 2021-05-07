import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAccessTokenComponent } from './verify-access-token.component';

describe('VerifyAccessTokenComponent', () => {
  let component: VerifyAccessTokenComponent;
  let fixture: ComponentFixture<VerifyAccessTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyAccessTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyAccessTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
