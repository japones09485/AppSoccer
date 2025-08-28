import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTempComponent } from './admin-temp.component';

describe('AdminTempComponent', () => {
  let component: AdminTempComponent;
  let fixture: ComponentFixture<AdminTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTempComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
