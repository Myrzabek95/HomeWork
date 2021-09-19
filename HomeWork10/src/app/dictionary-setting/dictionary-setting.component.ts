import { Component, OnInit } from '@angular/core';
import {
  DictionaryService,
  DefaultLang,
  Languages,
} from '../dictionary.service';

@Component({
  selector: 'app-dictionary-setting',
  templateUrl: './dictionary-setting.component.html',
  styleUrls: ['./dictionary-setting.component.css'],
})
export class DictionarySettingComponent implements OnInit {
  languages = Languages.filter((lang) => lang !== DefaultLang);
  selected = this.languages[0];
  selectedNo = 20;
  wordsNumber: number = 5;
  wordsNumbers: number[] = [5, 10, 15, 20];

  constructor(private DictionaryService: DictionaryService) {}

  ngOnInit(): void {
    this.DictionaryService.getLanguage().subscribe((res) => {
      this.selected = res;
    });
    this.DictionaryService.getNumberOfWords().subscribe((res) => {
      this.wordsNumber = Number.parseInt(res);
    });
  }

  saveSettings() {
    this.DictionaryService.setLanguage(this.selected);
    this.DictionaryService.setNumberOfWords(this.wordsNumber.toString());
  }
}
