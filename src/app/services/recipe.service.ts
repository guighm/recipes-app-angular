import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment as env } from '../../environments/environment.development';
import { RecipeDTO } from '../models/recipe-dto';
import { CreateRecipeDTO } from '../models/create-recipe-dto';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private readonly http = inject(HttpClient);

  jwt = signal<string | null>(localStorage.getItem("jwt"));

  getRecipes() {
    const url: string = env.apiUrl;
    return this.http.get<RecipeDTO[]>(`${url}/recipe`,
      {
        headers: {
          'Authorization': `Bearer ${this.jwt()}`
        },
        observe: 'response'
      },
    );
  }

  getRecipe(id: number) {
    const url: string = env.apiUrl;
    return this.http.get<RecipeDTO>(`${url}/recipe/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${this.jwt()}`
        },
        observe: 'response'
      },
    );
  }

  createRecipe(dto: CreateRecipeDTO) {
    const url: string = env.apiUrl;
    return this.http.post(`${url}/recipe`, dto, 
      {
        headers: {
          'Authorization': `Bearer ${this.jwt()}`
        },
        observe: 'response'
      },
  )
  }

  deleteRecipe(id: number) {
    const url: string = env.apiUrl;
    return this.http.delete(`${url}/recipe/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${this.jwt()}`
        },
        observe: 'response'
      },
    );
  }
}
