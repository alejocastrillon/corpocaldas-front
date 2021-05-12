import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicResourcesComponent } from './public-resources.component';

describe('PublicResourcesComponent', () => {
  let component: PublicResourcesComponent;
  let fixture: ComponentFixture<PublicResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
