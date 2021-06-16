import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdflibComponent } from './pdflib.component';

describe('PdflibComponent', () => {
  let component: PdflibComponent;
  let fixture: ComponentFixture<PdflibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdflibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdflibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
