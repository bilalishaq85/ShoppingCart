import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'first-proj';
  loadedFeature = '';


  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyAjQPMNprX0u1wUzO-biIyq2nkQZJYZZ6Y",
      authDomain: "ng-recipe-book-34ff3.firebaseapp.com",
    })
  }
  onNavigate(feature: string) {
    this.loadedFeature = feature
  }

}
