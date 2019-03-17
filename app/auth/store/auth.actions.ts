import { Action } from "@ngrx/store";

export const SIGN_IN = 'SIGN_IN'
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGN_UP = 'SIGN_UP'
export const TRY_SIGNUP = 'TRY_SIGNUP';
export const LOG_OUT = 'LOG_OUT'
export const Set_Token ='Set_Token'

export class TrySignup implements Action {
    readonly type = 'TRY_SIGNUP'

    constructor(public payload: {username: string, password: string}) {}
}

export class TrySignIn implements Action {
    readonly type = 'TRY_SIGNIN'

    constructor(public payload: {username: string, password: string}) {}
}

export class SignIn implements Action {
    readonly type = 'SIGN_IN'
}

export class SignUp implements Action {
    readonly type = 'SIGN_UP'   
}

export class LogOut implements Action {
    readonly type = 'LOG_OUT'
}

export class SetToken implements Action {
    readonly type = 'Set_Token'

    constructor(public payload: string) {}
}

export type AuthActions = SignIn | SignUp | LogOut | SetToken | TrySignup | TrySignIn;