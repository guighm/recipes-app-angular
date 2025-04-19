import { Component, inject } from '@angular/core';
import { AsteriscoComponent } from "../asterisco/asterisco.component";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { RecipeService } from '../../services/recipe.service';
import { CreateRecipeDTO } from '../../models/create-recipe-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-recipe-form',
  imports: [AsteriscoComponent, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './create-recipe-form.component.html',
  styleUrl: './create-recipe-form.component.css'
})
export class CreateRecipeFormComponent {

  private readonly formBuilder = inject(FormBuilder);
  private readonly recipeService = inject(RecipeService);
  private readonly router = inject(Router);

  form = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    preparationTime: [null, [Validators.required]],
    servings: [null, [Validators.required]],
    difficulty: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]]
  })

  getControl = (name: string) => this.form.get(name) as FormControl;

  imageUrl !: string;

  createRecipe() {
    this.recipeService.createRecipe(this.form.value as CreateRecipeDTO).subscribe({
      next: () => this.router.navigate(["/"])
    })
  }
}
