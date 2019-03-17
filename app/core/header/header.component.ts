import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "../../shared/backend.service";
import { Response } from "@angular/http";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as fromAuth from "../../auth/store/auth.reducers";
import * as AuthActions from "../../auth/store/auth.actions";
import { Observable } from "rxjs";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   authState: Observable<fromAuth.State>;

    constructor(private storeDataService: DataStorageService,
             //   private authService: AuthService,
                private route: Router,
                private store: Store<fromApp.AppState>) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    onSaveRecipe(){
        this.storeDataService.storeRecipes().subscribe(
            (response: Response) => {
            console.log(response);
            }
        )
        }
    
    onFetchData() {
        this.storeDataService.getRecipes();
    }

    onLogOut(){
        this.store.dispatch(new AuthActions.LogOut())
        this.route.navigate(['/'])
    }
}
   


  