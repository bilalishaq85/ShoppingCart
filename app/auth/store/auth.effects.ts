import {Effect, Actions} from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { from } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$                      //this is an observable
    .ofType(AuthActions.TRY_SIGNUP)
    .pipe(
        map((action: AuthActions.TrySignup) => {    // map returns new observable
            return action.payload
        }),
// *** SwitchMap also returns a new observable, this one will receive payload from previous map observable
        switchMap((authData: {username: string, password: string}) => {  
            return from(firebase.auth().createUserWithEmailAndPassword(authData.username, 
                    authData.password))
        }),
        switchMap(() => { 
            return from(firebase.auth().currentUser.getIdToken())
        }),
        mergeMap((token: string) => {
            return [
                {type: AuthActions.SIGN_UP},
                {type: AuthActions.Set_Token, payload: token}
            ]
        })
    );
    
    @Effect()
    authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .pipe(
        map((action: AuthActions.TrySignIn) => {
            return action.payload
        }),
        switchMap((authData: {username: string, password: string}) => {
            return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password))
        }),
        switchMap(() => { 
            return from(firebase.auth().currentUser.getIdToken())
        }),
        switchMap(() => { 
            return from(firebase.auth().currentUser.getIdToken())
        }),
        mergeMap((token: string) => {
            this.route.navigate(['/'])
            return [
                {type: AuthActions.SIGN_IN},
                {type: AuthActions.Set_Token, payload: token}
            ]
        })


    )
    @Effect({dispatch:false})
    authLogout = this.actions$
    .ofType(AuthActions.LOG_OUT)
    .pipe(
        tap(() => {
            this.route.navigate(['/'])
        })
    )


    constructor(private actions$: Actions,
                private route: Router) {}
}