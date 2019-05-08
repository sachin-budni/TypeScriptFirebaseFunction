import { Component, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessagingService } from './messaging.service';
import * as XLSX from 'ts-xlsx';
import { OverlayContainer } from '@angular/cdk/overlay';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'typeScriptFunction';
  data:Observable<any>;
  message;
  theme='first';
  constructor(private auth:AngularFireAuth,private http :HttpClient,private msgService:MessagingService,
    public overlayContainer: OverlayContainer){
  //  this.google();
    this.msgService.getPermission()
    this.msgService.receiveMessage()
    this.message = this.msgService.currentMessage
  }
  arrayBuffer:any;
  file:File;
  datas =[];

  @HostBinding('class') componentCssClass;

  onSetTheme(theme) {
      this.overlayContainer.getContainerElement().classList.add(this.theme);
      this.componentCssClass = this.theme;
    }

  ImportFile(event){
    this.file= event.target.files[0]; 
    // console.log(event);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, {type:"binary"});
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        // console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
        // this.datas.push(XLSX.utils.sheet_to_json(worksheet,{raw:true}))
        this.datas = XLSX.utils.sheet_to_json(worksheet,{raw:true});
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  google(){
    this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider).then(auth=>console.log(auth));
  }
}
