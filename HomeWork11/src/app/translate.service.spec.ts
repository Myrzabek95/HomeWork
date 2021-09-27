import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from './translate.service';

describe('TranslateService', () => {
  let service: TranslateService;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spyHttpClient = jasmine.createSpyObj('HttpClient', ['client']);
    TestBed.configureTestingModule({
      providers: [
        TranslateService,
        { provide: HttpClient, useValue: spyHttpClient },
      ],
    });
    service = TestBed.inject(TranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
