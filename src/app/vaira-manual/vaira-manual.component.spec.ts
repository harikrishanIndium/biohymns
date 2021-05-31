import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VairaManualComponent } from './vaira-manual.component';

describe('VairaManualComponent', () => {
  let component: VairaManualComponent;
  let fixture: ComponentFixture<VairaManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VairaManualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VairaManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
