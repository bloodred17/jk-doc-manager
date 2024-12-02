import { Route } from '@angular/router';
import { HomeComponent } from './views/home.component';
import { signInGuard } from './guards/sign-in.guard';
import { SignInComponent } from './views/sign-in.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { ConversationComponent } from './views/conversation.component';
import { ConversationHistoryComponent } from './views/conversation-history.component';
import { UploadedFilesComponent } from './views/uploaded-files.component';
import { NewConversationComponent } from './views/new-conversation.component';
import { SignUpComponent } from './views/sign-up.component';

export const appRoutes: Route[] = [
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [signInGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'ask/:id',
        component: ConversationComponent,
      },
      {
        path: 'history',
        component: ConversationHistoryComponent,
      },
      {
        path: 'new',
        component: NewConversationComponent,
      },
    ],
  },
];
