import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgReduxModule } from '@angular-redux/store';
import { AngularFireDatabase } from 'angularfire2/database';
import {
  MdGridListModule,
  MdButtonModule,
  OverlayContainer,
  MdMenuModule,
  MdProgressBarModule,
  MdCardModule,
  MdInputModule,
  MdListModule,
  MdSnackBarModule,
  MdIconModule,
  MdDialogModule,
  MaterialModule,
  MdSidenavModule,
  MdToolbarModule,
  MdProgressSpinnerModule,
 } from '@angular/material';

import { LoggedinGard } from './login';
import { FirebaseService } from './core/firebase.service';
import { UserService } from './user/user.service';
import { PcloudService } from './core/pcloud.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { ProfileComponent } from './profile/profile.component';
import { AddLinkDialogComponent } from './add-link-dialog/add-link-dialog.component';
import { PcloudComponent } from './pcloud/pcloud.component';
import { PclodLoginComponent } from './pclod-login/pclod-login.component';
import { PocketComponent } from './pocket/pocket.component';
import { PocketService } from 'app/core/pocket.service';
import { SnackService } from './snack.service';
import { UtilService } from './core/util.service';
import 'hammerjs';
import { NumberPipe } from 'app/number.pipe';
import { RoundPipe } from './round.pipe';
import { ProgressComponent } from './components/progress/progress.component';
import { CounterActions } from './actions';
import { TestComponent } from './test/test.component';
import { LinkContainerComponent } from './link-container/link-container.component';
import { LinkComponent } from './components/link/link.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DatepickerModule } from 'angular2-material-datepicker';
import { LogMoneyComponent } from './components/log-money/log-money.component';

export const firebaseConfig = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyA2uiA90qnC-Lt0le4kHj79ogxmt9rr9N0',
    authDomain: 'test-firebase-26a80.firebaseapp.com',
    databaseURL: 'https://test-firebase-26a80.firebaseio.com',
    projectId: 'test-firebase-26a80',
    storageBucket: 'test-firebase-26a80.appspot.com',
    messagingSenderId: '398288908275'
  }
};

// const myFirebaseAuthConfig = {
//   provider: AuthProviders.Google,
//   method: AuthMethods.Redirect
// };

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, canActivate: [ LoggedinGard ] },
  { path: 'pcloud', component: PcloudComponent, canActivate: [ LoggedinGard ] },
  { path: 'pcloud-login', component: PclodLoginComponent, canActivate: [ LoggedinGard ] },
  { path: 'pocket', component: PocketComponent, canActivate: [ LoggedinGard ] },
  { path: 'links', component: LinkContainerComponent, canActivate: [ LoggedinGard ] },
  { path: 'test', component: TestComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppNavComponent,
    ProfileComponent,
    AddLinkDialogComponent,
    PcloudComponent,
    PclodLoginComponent,
    PocketComponent,
    NumberPipe,
    RoundPipe,
    ProgressComponent,
    TestComponent,
    LinkContainerComponent,
    LinkComponent,
    LogMoneyComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgReduxModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MdGridListModule,
    MdButtonModule,
    MdProgressBarModule,
    MdCardModule,
    MdMenuModule,
    MdInputModule,
    MdListModule,
    MdSnackBarModule,
    MdIconModule,
    MdDialogModule,
    MdSidenavModule,
    MdToolbarModule,
    MdProgressSpinnerModule,
    DatepickerModule,
  ],
  entryComponents: [ AddLinkDialogComponent, LogMoneyComponent ],
 providers: [
   LoggedinGard,
   FirebaseService,
   UserService,
   PcloudService,
   SnackService,
   UtilService,
   PocketService,
   CounterActions,
   AngularFireDatabase,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
