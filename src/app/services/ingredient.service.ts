import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CreateIngredientDTO } from '../models/create-ingredient-dto';
import { environment as env } from '../../environments/environment.development';
import { IngredientDTO } from '../models/ingredient-dto';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private readonly http = inject(HttpClient);

  jwt = signal<string | null>(localStorage.getItem("jwt"));

  createIngredient(dto: CreateIngredientDTO) {
    const url = env.apiUrl;
    return this.http.post(`${url}/ingredient`, dto, 
      {
        headers: {
          'Authorization': `Bearer ${this.jwt()}`
        },
        observe: 'response'
      }
    )
  }

  getIngredients(id: number) {
    const url = env.apiUrl;
    return this.http.get<IngredientDTO[]>(`${url}/recipe/${id}/ingredients`, 
      {
        headers: {
          'Authorization': `Bearer ${this.jwt()}`
        },
        observe: 'response'
      }
    )
  }
}
