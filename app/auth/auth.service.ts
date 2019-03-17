import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions'

@Injectable()
export class AuthService {

    constructor(private route: Router, private store: Store<fromApp.AppState>){}

    signup(email: string, password: string){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
            user => {
                    this.store.dispatch(new AuthActions.SignUp())
                    firebase.auth().currentUser.getIdToken()
                    .then (
                        (token: string) => {
                        this.store.dispatch(new AuthActions.SetToken(token))
                        }
                    )
                }
            )
        .catch(
            error => console.log(error)
        )
    }

    signin(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            response => {
                this.store.dispatch(new AuthActions.SignIn())
                this.route.navigate(['/'])
                firebase.auth().currentUser.getIdToken()
                .then (
                    (token: string) => {
                        this.store.dispatch(new AuthActions.SetToken(token))
                    }
                )
            }
        )  
        .catch(
            error => console.log(error)
        )
    }

    logout() {
        firebase.auth().signOut();
        this.store.dispatch(new AuthActions.LogOut())
    }
}