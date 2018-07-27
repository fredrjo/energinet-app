import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardPage } from './scorecard.page';

describe('ScorecardPage', () => {
  let component: ScorecardPage;
  let fixture: ComponentFixture<ScorecardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorecardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
