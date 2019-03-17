import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const ADD_RECIPEINGS = 'ADD_RECIPEINGS'
export const UPDATE_INGS = 'UPDATE_INGS'
export const DELETE_INGS = 'DELETE_INGS'
export const START_EDIT = 'START_EDIT'
export const STOP_EDIT = 'STOP_EDIT'

export class AddIngredient implements Action{
    readonly type = ADD_INGREDIENT;
    
    constructor (public payload: Ingredient){}
}

export class AddRecipeIngs implements Action{
    readonly type = ADD_RECIPEINGS;
    
    constructor (public payload: Ingredient[]){}
}

export class UpdateIngredient implements Action{
    readonly type = UPDATE_INGS;
    
    constructor (public payload: {ingredient: Ingredient}){}
}

export class DeleteIngredient implements Action{
    readonly type = DELETE_INGS;
    
    //constructor (public payload: number){}
}

export class StartEdit implements Action{
    readonly type = START_EDIT;
    
    constructor (public payload: number){}
}

export class StopEdit implements Action{
    readonly type = STOP_EDIT;  
}
export type ShoppingListActions = AddIngredient | AddRecipeIngs | UpdateIngredient | DeleteIngredient | StartEdit | StopEdit;
