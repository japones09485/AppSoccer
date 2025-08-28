import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuecesComponent } from './jueces.component';

describe('JuecesComponent', () => {
  let component: JuecesComponent;
  let fixture: ComponentFixture<JuecesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuecesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
