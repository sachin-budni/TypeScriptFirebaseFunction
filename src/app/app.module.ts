import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireFunctionsModule } from 'angularfire2/functions';
import { HttpClientModule } from '@angular/common/http';
import { MessagingService } from './messaging.service';

const firebaseConfig ={
  apiKey: "AIzaSyCv7Qva07s-1kCUN6sT5bKDBODCiQxSKPA",
  authDomain: "allfire-fb40c.firebaseapp.com",
  databaseURL: "https://allfire-fb40c.firebaseio.com",
  projectId: "allfire-fb40c",
  storageBucket: "allfire-fb40c.appspot.com",
  messagingSenderId: "643480662406"
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    AngularFirestoreModule,HttpClientModule
  ],
  providers: [MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
