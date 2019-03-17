import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import * as RecipeActions from '../store/recipe.actions'
import * as fromRecipe from '../store/recipe.reducers';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup
  id: number;
  editMode = false;

  constructor(private route:ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,              
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params:Params) => {
        this.id =+ params['id']
        this.editMode = params['id'] != null;           
        this.initForm();
      }
    )
  }

  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {  
      console.log(this.editMode)    
      this.store.select('recipes')
      .pipe(
        take(1))
      .subscribe((recipeState: fromRecipe.State) => {
        const recipe = recipeState.recipes[this.id]
        recipeName = recipe.name;
        imagePath  = recipe.imagePath;
        description = recipe.description
        if (recipe['ingredients']) {
          for (let ingredient of recipe.ingredients){
            recipeIngredients.push(
              new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required,
                                                            Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            )
          }
        }
      })
    }
    this.recipeForm = new FormGroup({
     'name' : new FormControl(recipeName, Validators.required),
     'imagePath': new FormControl(imagePath, Validators.required),
     'description': new FormControl(description, Validators.required),
     'ingredients': recipeIngredients
    });
  }

  onSubmit(){
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value)
      this.store.dispatch(new RecipeActions.UpdateRecipe(
        {index: this.id, 
        updatedRecipe:this.recipeForm.value}))
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteRecipeIng(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)

  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)] )
      })
    )
  }
}
