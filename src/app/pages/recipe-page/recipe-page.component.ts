import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeDTO } from '../../models/recipe-dto';
import { RecipeService } from '../../services/recipe.service';
import { IngredientDTO } from '../../models/ingredient-dto';
import { StepDTO } from '../../models/step-dto';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngredientService } from '../../services/ingredient.service';
import { StepService } from '../../services/step.service';
import { CreateIngredientDTO } from '../../models/create-ingredient-dto';
import { CreateStepDTO } from '../../models/create-step-dto';

@Component({
  selector: 'app-recipe-page',
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.css'
})
export class RecipePageComponent implements OnInit {

  id !: number;
  receita !: RecipeDTO;
  ingredientes !: IngredientDTO[];
  passos !: StepDTO[];
  isForm1Visible : boolean = false;
  isForm2Visible : boolean = false;

  private readonly route = inject(ActivatedRoute);
  private readonly recipeService = inject(RecipeService);
  private readonly ingredientService = inject(IngredientService);
  private readonly stepService = inject(StepService);
  private readonly formBuilder = inject(FormBuilder);

  ingredientForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    quantity: ['', [Validators.required]]
  })

  stepForm = this.formBuilder.group({
    number: [, [Validators.required]],
    description: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.recipeService.getRecipe(this.id).subscribe({
      next: (value) => {
        if (value.body) {
          this.receita = value.body;
        }
      }
    })

    this.getIngredients()
    this.getSteps()

  }

  getSteps() {
    this.stepService.getSteps(this.id).subscribe({
      next: (value) => {
        if (value.body) {
          this.passos = value.body
        }
      }
    })
  }

  getIngredients() {
    this.ingredientService.getIngredients(this.id).subscribe({
      next: (value) => {
        if (value.body) {
          this.ingredientes = value.body
        }
      }
    })
  }

  showIngredientForm() {
    this.isForm1Visible = !this.isForm1Visible;
  }

  showStepForm() {
    this.isForm2Visible = !this.isForm2Visible;
  }

  registerIngredient() {
    const dto: CreateIngredientDTO = {
      recipeId: this.id,
      name: this.ingredientForm.value.name!,
      quantity: this.ingredientForm.value.quantity!,
    }
    this.ingredientService.createIngredient(dto).subscribe({
      next: () => this.getIngredients()
    })
  }

  registerStep() {
    const dto: CreateStepDTO = {
      recipeId: this.id,
      stepNumber: this.stepForm.value.number!,
      description: this.stepForm.value.description!
    }
    this.stepService.createStep(dto).subscribe({
      next: () => this.getSteps()
    })
  }

  
}