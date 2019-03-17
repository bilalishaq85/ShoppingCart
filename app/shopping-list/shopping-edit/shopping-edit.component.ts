import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShopListActions from '../store/shop-list.actions'
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingForm: NgForm 
  InEditSubsciption: Subscription;
  editMode = false; 
  editedItem: Ingredient

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.InEditSubsciption = this.store.select('shoppingList')
    .subscribe(
      data => {
        if (data.editedIngIndex > -1) {          
          this.editedItem = data.editedIng;
          this.editMode = true;          
          this.ingForm.setValue({
            ingName: this.editedItem.name,
            ingAmount: this.editedItem.amount
          })
        } else {
            this.editMode = false;
        }
      }
    )
  }

  onSubmit(form: NgForm) { 
    const value = form.value    
    const ingNew = new Ingredient(value.ingName, value.ingAmount) 
    if ( this.editMode ){
      // this.slService.updateIngredient(this.editIngIndex, ingNew)
      this.store.dispatch(new ShopListActions.UpdateIngredient({ingredient: ingNew}))
    } else {
      //this.slService.addIngredient(ingNew);    
      this.store.dispatch(new ShopListActions.AddIngredient(ingNew))
    }
    this.editMode = false;   
    form.reset()
  }

  onDelete(){
    // this.slService.deleteIngredient(this.editIngIndex)
    this.store.dispatch(new ShopListActions.DeleteIngredient())
    this.onClear();
  }

  onClear(){
    this.ingForm.reset()
    this.editMode = false
  }

  ngOnDestroy() {
    this.store.dispatch(new ShopListActions.StopEdit())
    this.InEditSubsciption.unsubscribe()    
  }
}
