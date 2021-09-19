import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateResult } from './Model';
@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  constructor(private httpClient: HttpClient) {}

  get(
    translated: string,
    from: string,
    to: string
  ): Observable<TranslateResult> {
    let url = `https://api.mymemory.translated.net/get?q=${translated}&langpair=${from}|${to}&user=b2d63d013f7bcaa81745&de=kzmyrzabek@gmail.com`;
    return this.httpClient.get<TranslateResult>(url);
  }
}
