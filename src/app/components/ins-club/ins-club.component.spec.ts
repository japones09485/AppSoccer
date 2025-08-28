import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsClubComponent } from './ins-club.component';

describe('InsClubComponent', () => {
  let component: InsClubComponent;
  let fixture: ComponentFixture<InsClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsClubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
