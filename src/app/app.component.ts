import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessagingService } from './messaging.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'typeScriptFunction';
  data:Observable<any>;
  message;
  constructor(private auth:AngularFireAuth,private http :HttpClient,private msgService:MessagingService){
    this.google();
    this.msgService.getPermission()
    this.msgService.receiveMessage()
    this.message = this.msgService.currentMessage
  }

  google(){
    this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider).then(auth=>console.log(auth));
  }
}
