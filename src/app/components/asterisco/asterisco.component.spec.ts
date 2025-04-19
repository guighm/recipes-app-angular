import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsteriscoComponent } from './asterisco.component';

describe('AsteriscoComponent', () => {
  let component: AsteriscoComponent;
  let fixture: ComponentFixture<AsteriscoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsteriscoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsteriscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
