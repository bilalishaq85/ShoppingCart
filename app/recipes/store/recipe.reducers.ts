import { Recipe } from "../recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe('A test Recipe', 'This is a test Recipe',
        'https://upload.wikimedia.org/wikipedia/commons/d/d7/Pizza-2.jpg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('Bread', 1),
        ]),
        new Recipe('A test Recipe-2', 'This is a test Recipe-2',
        'https://upload.wikimedia.org/wikipedia/commons/4/4d/Cheeseburger.jpg',
        [
            new Ingredient('Potatoes', 5),
            new Ingredient('Fries', 20),
        ])
      ]
}

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case (RecipeActions.SET_RECIPES):
        return {
            ...state,
            recipes: [...action.payload]
        }
        case(RecipeActions.ADD_RECIPE):
        return {
            ...state,
            recipes: [...state.recipes, action.payload]
        }
        case(RecipeActions.UPDATE_RECIPE):
        const recipe = state.recipes[action.payload.index];
        const updateRecipe = {
            ...recipe,
            ...action.payload.updatedRecipe
        }
        const recipes = [...state.recipes];
        recipes[action.payload.index] = updateRecipe;
        return {
            ...state,
            recipes: recipes
        }
        case (RecipeActions.DELETE_RECIPE):
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: oldRecipes
            }
        default:
            return state;
    }
    
}