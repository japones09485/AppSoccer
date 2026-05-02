import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTComponent } from './info-t.component';

describe('InfoTComponent', () => {
  let component: InfoTComponent;
  let fixture: ComponentFixture<InfoTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoTComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
