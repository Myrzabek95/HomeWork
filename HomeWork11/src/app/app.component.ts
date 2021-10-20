import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HomeWork11';
  navLinks = [
    { path: 'recently-added', label: 'Recently Added' },
    { path: 'education', label: 'Education' },
    { path: 'dictionary-setting', label: 'Dictionary Setting' },
  ];
}
