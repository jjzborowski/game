import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MepelComponent } from './mepel.component';

describe('MepelComponent', () => {
  let component: MepelComponent;
  let fixture: ComponentFixture<MepelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MepelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MepelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
