import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RecentlyAddedComponent } from './recently-added.component';
import { TranslateService } from '../translate.service';

describe('RecentlyAddedComponent', () => {
  let component: RecentlyAddedComponent;
  let fixture: ComponentFixture<RecentlyAddedComponent>;

  beforeEach(async () => {
    const TranslateServiceSpy = jasmine.createSpyObj('TranslateService', [
      'Service',
    ]);

    TestBed.configureTestingModule({
      declarations: [RecentlyAddedComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: TranslateService, useValue: TranslateServiceSpy }],
    });

    fixture = TestBed.createComponent(RecentlyAddedComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
