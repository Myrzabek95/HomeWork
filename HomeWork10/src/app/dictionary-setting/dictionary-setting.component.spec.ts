import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionarySettingComponent } from './dictionary-setting.component';

describe('DictionarySettingComponent', () => {
  let component: DictionarySettingComponent;
  let fixture: ComponentFixture<DictionarySettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictionarySettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionarySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
