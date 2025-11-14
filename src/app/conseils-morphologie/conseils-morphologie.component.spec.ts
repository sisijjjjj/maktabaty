import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConseilsMorphologieComponent } from './conseils-morphologie.component';

describe('ConseilsMorphologieComponent', () => {
  let component: ConseilsMorphologieComponent;
  let fixture: ComponentFixture<ConseilsMorphologieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConseilsMorphologieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConseilsMorphologieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
