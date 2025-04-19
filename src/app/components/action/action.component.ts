import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-action',
  imports: [],
  templateUrl: './action.component.html',
  styleUrl: './action.component.css'
})
export class ActionComponent {
  @Input() label : string = "";
  @Input() message : string = "";
  @Input() action !: () => void;
}