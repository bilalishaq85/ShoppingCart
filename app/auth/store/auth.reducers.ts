import * as AuthActions from './auth.actions'

export interface State {
    authenticated: boolean;
    token: string;
}

const initialState: State = {
    authenticated: false,
    token: null
}

export function authReducer (state = initialState, action : AuthActions.AuthActions) {
    switch(action.type) {
        case AuthActions.SIGN_UP:
        case AuthActions.SIGN_IN:
            return {
                ...state,
                authenticated: true
            }           
        case AuthActions.LOG_OUT:
            return {
                ...state,
                authenticated: false,
                token: null
            }
        case AuthActions.Set_Token:
            return {
                ...state,
                token: action.payload
            }
        default:
            return state
    } 
}