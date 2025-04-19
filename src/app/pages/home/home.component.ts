import { Component, inject, OnInit } from '@angular/core';
import { RecipeDTO } from '../../models/recipe-dto';
import { RecipeService } from '../../services/recipe.service';
import { RouterLink } from '@angular/router';
import { ActionComponent } from "../../components/action/action.component";
import { TooltipComponent } from "../../components/tooltip/tooltip.component";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TooltipComponent, ActionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  receitas !: RecipeDTO[];

  private readonly userService = inject(UserService);
  private readonly recipeService = inject(RecipeService);

  isAuthenticated : boolean = this.userService.isAuthenticated();

  ngOnInit(): void {
    if (this.isAuthenticated) {
      this.getRecipes();
    }
  }

  getRecipes() {
    this.recipeService.getRecipes().subscribe({
      next: (value) => {
        console.log(value)
        if (value.body) {
          this.receitas = value.body
        }
      }
    })
  }

  deleteRecipe(id: number) {
    return () => {
      const value = confirm("Gostaria de deletar esta receita?")
      if (value) {
          this.recipeService.deleteRecipe(id).subscribe({
            next: () => window.location.reload()
          })
      }
    }
  }

  deslogar() {
    localStorage.removeItem('jwt');
    window.location.reload();
  }
}