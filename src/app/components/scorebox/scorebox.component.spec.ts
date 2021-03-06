import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboxComponent } from './scorebox.component';

describe('ScoreboxComponent', () => {
  let component: ScoreboxComponent;
  let fixture: ComponentFixture<ScoreboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
