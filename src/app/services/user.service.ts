import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginDTO } from '../models/login-dto';
import { JwtDto } from '../models/jwt-dto';
import { environment as env } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http = inject(HttpClient);

  jwt = signal<string | null>(localStorage.getItem("jwt"));

  isAuthenticated = computed(() => !!this.jwt()) 

  login(dto: LoginDTO) {
    const url = env.apiUrl;
    return this.http.post<JwtDto>(url + "/auth/login", dto,
      {
        observe: 'response'
      }
    )
  }
}
