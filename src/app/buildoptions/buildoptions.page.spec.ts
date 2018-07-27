import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildoptionsPage } from './buildoptions.page';

describe('BuildoptionsPage', () => {
  let component: BuildoptionsPage;
  let fixture: ComponentFixture<BuildoptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildoptionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildoptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
