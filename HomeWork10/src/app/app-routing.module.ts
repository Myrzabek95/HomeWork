import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecentlyAddedComponent } from './recently-added/recently-added.component';
import { EducationComponent } from './education/education.component';
import { DictionarySettingComponent } from './dictionary-setting/dictionary-setting.component';

const routes: Routes = [
  { path: 'recently-added', component: RecentlyAddedComponent },
  { path: 'education', component: EducationComponent },
  { path: 'dictionary-setting', component: DictionarySettingComponent },
  { path: '', redirectTo: '/recently-added', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
