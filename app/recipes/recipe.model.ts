import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[]

    constructor(name: string, desc:string, impagePath:string, ingredients: Ingredient[]){
        this.name = name;
        this.description = desc;
        this.imagePath = impagePath;
        this.ingredients = ingredients;
    }
}