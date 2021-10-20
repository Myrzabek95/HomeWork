import { Component, OnInit } from '@angular/core';
import { DictionaryService, DefaultLang } from '../dictionary.service';
import { Translate } from '../Model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  word: number = 0;
  words: number = 0;
  checkingWord: string = '';
  testing: string = '';
  curTr: Translate = null as any;
  list: Translate[] = [];
  lang: string = '';

  showError = false;
  showSuccess = false;

  constructor(private Dictionary: DictionaryService) {}

  ngOnInit(): void {
    this.Dictionary.getDictionary().subscribe((res) => {
      this.list = res;
      if (res.length > 0) {
        this.word = 1;
        this.words = res.length;
        this.curTr = res[0];
        this.loadLangs();
      }
    });
    this.Dictionary.getLanguage().subscribe((res) => {
      this.lang = res;
    });
  }

  loadLangs() {
    this.checkingWord = this.curTr.values.find(
      (item) => item.lang === DefaultLang
    )?.text as string;
  }

  check() {
    this.showError = false;
    this.showSuccess = false;
    if (
      this.testing.toLowerCase() ===
      this.curTr.values
        .find((item) => item.lang === this.lang)
        ?.text.toLowerCase()
    ) {
      this.showSuccess = true;
    } else {
      this.showError = true;
    }
  }

  goToNext() {
    this.showError = false;
    this.showSuccess = false;
    this.testing = '';
    if (this.word === this.words) this.word = 1;
    else this.word++;
    this.curTr = this.list[this.word - 1];
    this.loadLangs();
  }

  ngAfterViewInit() {
    this.ngOnInit();
  }
}
