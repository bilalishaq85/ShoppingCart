import * as ShopListActions from './shop-list.actions';

import { Ingredient } from "../../shared/ingredient.model";

export interface State {
    ingredients: Ingredient[];
    editedIng : Ingredient;
    editedIngIndex : number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('tomatoes', 10),
      ],
    editedIng: null,
    editedIngIndex: -1
};

export function shopListReducer(state = initialState, action: ShopListActions.ShoppingListActions) {
    switch (action.type) {
        case ShopListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        case ShopListActions.ADD_RECIPEINGS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        case ShopListActions.UPDATE_INGS:
            const ingredient = state.ingredients[state.editedIngIndex]
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient  // keep an eye on this line
            }
            const ingredients = [...state.ingredients];
            ingredients[state.editedIngIndex] = updatedIngredient
            return {
                ...state,
                ingredients: ingredients,
                editedIng: null,
                editedIngIndex: -1
            }            
        case ShopListActions.DELETE_INGS:
            const oldIngredients = [...state.ingredients];            
            oldIngredients.splice(state.editedIngIndex, 1);
            return {
                ...state,
                ingredients: oldIngredients,
                editedIng: null,
                editedIngIndex: -1
            }
        case ShopListActions.START_EDIT:
            const editedIng = {...state.ingredients[action.payload]};
            return {
                ...state,
                editedIng: editedIng,
                editedIngIndex: action.payload
            }
        case ShopListActions.STOP_EDIT:
            return {
                ...state,
                editedIng: null,
                editedIngIndex: -1
            }
        default:
            return state;
    }   
}