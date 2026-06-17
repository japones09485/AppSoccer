import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsJugadorComponent } from './ins-jugador.component';

describe('InsJugadorComponent', () => {
  let component: InsJugadorComponent;
  let fixture: ComponentFixture<InsJugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsJugadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
