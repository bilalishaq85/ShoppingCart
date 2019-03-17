import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpRequest } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map } from 'rxjs/operators'
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient, 
                private RecipeService: RecipeService,
             //   private authService: AuthService
             ) {}

    storeRecipes() {
        return this.httpClient.put('https://ng-recipe-book-34ff3.firebaseio.com/recipes.json', 
        this.RecipeService.getRecipes(), {
            reportProgress: true          
        });        
    }
    
    getRecipes() {
        this.httpClient.get<Recipe[]>('https://ng-recipe-book-34ff3.firebaseio.com/recipes.json',{
            reportProgress: true
            })
        .pipe(
            map(
                (recipes) => {
                    console.log(recipes)
                    for (let recipe of recipes) {
                        if(!recipe['ingredient']) {
                            recipe['ingredient'] = [];
                        }
                    }
                    return recipes
                }
        )
        )
        .subscribe (
            (recipes: Recipe[]) => {                
                this.RecipeService.setRecipes(recipes);
            }
        )
    }
}