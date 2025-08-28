import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTorneoComponent } from './info-torneo.component';

describe('InfoTorneoComponent', () => {
  let component: InfoTorneoComponent;
  let fixture: ComponentFixture<InfoTorneoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoTorneoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
