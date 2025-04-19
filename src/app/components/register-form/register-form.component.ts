import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AsteriscoComponent } from "../asterisco/asterisco.component";
import { ErrorMessageComponent } from "../error-message/error-message.component";

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, RouterLink, AsteriscoComponent, ErrorMessageComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  private readonly formBuilder = inject(FormBuilder);

  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  ola = () => {
    alert(456)
  }

  getControl = (name: string) => this.registerForm.get(name) as FormControl;

}