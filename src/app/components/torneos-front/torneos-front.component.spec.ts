import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneosFrontComponent } from './torneos-front.component';

describe('TorneosFrontComponent', () => {
  let component: TorneosFrontComponent;
  let fixture: ComponentFixture<TorneosFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TorneosFrontComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorneosFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
