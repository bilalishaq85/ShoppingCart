import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { recipeReducer } from "./store/recipe.reducers";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeStartComponent,
        RecipeItemComponent,
        RecipeListComponent,
        RecipeEditComponent,
        RecipeDetailComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule,
        StoreModule.forFeature('recipes', recipeReducer)
    ]
})
export class RecipesModule {}