import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private readonly userService = inject(UserService);
  @Input() isAuthenticated : boolean = this.userService.isAuthenticated();

}