import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegadoCanchaComponent } from './delegado-cancha.component';

describe('DelegadoCanchaComponent', () => {
  let component: DelegadoCanchaComponent;
  let fixture: ComponentFixture<DelegadoCanchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelegadoCanchaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegadoCanchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
