import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailComponent } from './mail.component';
import { MailSearchPipe } from './pipes/mail-search.pipe';
import { MailComposeComponent } from './mail-compose/mail-compose.component';
import { MailDetailComponent } from './mail-detail/mail-detail.component';
import { MailListComponent } from './mail-list/mail-list.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from './pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppState } from './app.state';

import { RouterModule, Routes } from '@angular/router';

export const routes : Routes= [
  {
    path: '',
    component: MailComponent,
    children: [
      // { path: '', redirectTo: 'mail-list/inbox', pathMatch: 'full' },
      { path: '', component: MailListComponent },
      // { path: 'mail-compose', component: MailComposeComponent },
      // { path: 'mail-list/:type/:id', component: MailDetailComponent }
    ]
  }
];


@NgModule({
  declarations: [
    MailComponent,
    MailComposeComponent,
    MailDetailComponent,
    MailListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  providers: [AppState]

})
export class MailModule { }
