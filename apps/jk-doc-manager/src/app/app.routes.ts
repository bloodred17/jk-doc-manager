import { Route } from '@angular/router';
import { HomeComponent } from './views/home.component';
import { signInGuard } from './guards/sign-in.guard';
import { SignInComponent } from './views/sign-in.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { ConversationComponent } from './views/conversation.component';
import { ConversationHistoryComponent } from './views/conversation-history.component';
import { UploadedFilesComponent } from './views/uploaded-files.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: SignInComponent,
  },
  {
    path: '',
    component: MainLayoutComponent,
    // canActivateChild: [signInGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'ask',
        component: ConversationComponent,
      },
      {
        path: 'history',
        component: ConversationHistoryComponent,
      },
      {
        path: 'uploaded',
        component: UploadedFilesComponent,
      },
    ],
  },
];
