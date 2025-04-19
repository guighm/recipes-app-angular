import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment as env } from '../../environments/environment.development';
import { CreateStepDTO } from '../models/create-step-dto';
import { StepDTO } from '../models/step-dto';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  private readonly http = inject(HttpClient);

  jwt = signal<string | null>(localStorage.getItem("jwt"));

  createStep(dto: CreateStepDTO) {
    const url = env.apiUrl;
    return this.http.post(`${url}/step`, dto, 
      {
        headers: {
          'Authorization': `Bearer ${this.jwt()}`
        },
        observe: 'response'
      }
    )
  }

  getSteps(id: number) {
    const url = env.apiUrl;
    return this.http.get<StepDTO[]>(`${url}/recipe/${id}/steps`, 
      {
        headers: {
          'Authorization': `Bearer ${this.jwt()}`
        },
        observe: 'response'
      }
    )
  }
}
