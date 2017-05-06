import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

export const firebaseConfig = {
  apiKey: 'AIzaSyA2uiA90qnC-Lt0le4kHj79ogxmt9rr9N0',
  authDomain: 'test-firebase-26a80.firebaseapp.com',
  databaseURL: 'https://test-firebase-26a80.firebaseio.com',
  projectId: 'test-firebase-26a80',
  storageBucket: 'test-firebase-26a80.appspot.com',
  messagingSenderId: '398288908275'
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, canActivate: [ LoggedinGard ] },
  { path: 'pcloud', component: PcloudComponent, canActivate: [ LoggedinGard ] },
  { path: 'pcloud-login', component: PclodLoginComponent, canActivate: [ LoggedinGard ] },
  { path: 'pocket', component: PocketComponent, canActivate: [ LoggedinGard ] }
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
    RoundPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
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
  ],
  entryComponents: [ AddLinkDialogComponent ],
 providers: [
   LoggedinGard,
   FirebaseService,
   UserService,
   PcloudService,
   SnackService,
   UtilService,
   PocketService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
