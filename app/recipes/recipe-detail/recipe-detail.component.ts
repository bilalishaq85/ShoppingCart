import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ShopListActions from '../../shopping-list/store/shop-list.actions';
import * as fromApp from '../../store/app.reducers';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router:Router,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeState = this.store.select('recipes');
      }
    )
  }

  onEditRecipe(){
    console.log(this.router.navigate(['edit'], {relativeTo: this.route}));
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route}); 
  }

  onAddShoppingList(){
    this.store.select('recipes')
    .pipe(
      take(1))
      .subscribe((
      recipeState: fromRecipe.State) => {
        this.store.dispatch(new ShopListActions.AddRecipeIngs(recipeState.recipes[this.id].ingredients))
      }
    )  
    
  }

  onDelete(){
        this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
        this.router.navigate(['/recipes']);
    }  
}
