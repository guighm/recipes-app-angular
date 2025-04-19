import { Component } from '@angular/core';
import { CreateRecipeFormComponent } from "../../components/create-recipe-form/create-recipe-form.component";

@Component({
  selector: 'app-create-recipe',
  imports: [CreateRecipeFormComponent],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css'
})
export class CreateRecipeComponent {

}
