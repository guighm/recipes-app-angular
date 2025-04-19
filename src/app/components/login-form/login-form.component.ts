import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsteriscoComponent } from "../asterisco/asterisco.component";
import { Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { UserService } from '../../services/user.service';
import { LoginDTO } from '../../models/login-dto';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, AsteriscoComponent, RouterLink, ErrorMessageComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  private readonly formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  login = () => {
    const dto : LoginDTO = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    }
    return this.userService.login(dto).subscribe({
      next: (value) => {
        if (value.body) {
          this.userService.jwt.set(value.body.accessToken)
          localStorage.setItem("jwt", value.body.accessToken)
          this.router.navigate(["/"]);
        }
      }
    })
  }

  getControl = (name: string) => this.loginForm.get(name) as FormControl;

}
