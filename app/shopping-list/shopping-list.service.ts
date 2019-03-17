// import { Ingredient } from "../shared/ingredient.model";
// import { EventEmitter } from "@angular/core";
// import { Subject } from "rxjs";

// export class ShoppingListService {
//     ingredientAdded = new Subject<Ingredient[]>();
//     ingredientEdit  = new Subject<number>();

//     private ingredients: Ingredient[] = [
//         new Ingredient('Apples', 5),
//         new Ingredient('tomatoes', 10),
//       ];

//     // getIngredients(){
//     //     return this.ingredients.slice();
//     // }
    
//     getIngredientToEdit(index: number) {
//         return this.ingredients[index];
//     }

//     // addIngredient(ingredient: Ingredient){
//     //     this.ingredients.push(ingredient);
//     //     this.ingredientAdded.next(this.ingredients.slice());
//     // }

//     updateIngredient(index: number, newIngredient: Ingredient){
//         this.ingredients[index] = newIngredient
//         this.ingredientAdded.next(this.ingredients.slice())
//     }

//     deleteIngredient(index: number){
//         this.ingredients.splice(index, 1)
//         this.ingredientAdded.next(this.ingredients.slice())
//     }

//     // addRecipeIngredients(ingredient: Ingredient[]){
//     //     this.ingredients.push(...ingredient);  // this is  to expand the array
//     //     this.ingredientAdded.next(this.ingredients.slice())
//     // }
// }

