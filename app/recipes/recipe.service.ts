import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();


    private recipes: Recipe[] = [
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
      ];
    
    getRecipes() {
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice())
    }

    getRecipeById(index: number) {
        return this.recipes[index];
    }

    // addIngredients(ingredients: Ingredient[]){
    //     this.store.dispatch(new ShopListActions.AddRecipeIngs(ingredients))
    // }

    addRecipe(newRecipe: Recipe){
        this.recipes.push(newRecipe)
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe:Recipe){
        this.recipes[index] = newRecipe
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1)
        this.recipesChanged.next(this.recipes.slice())
    }

}