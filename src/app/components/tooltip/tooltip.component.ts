import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tooltip',
  imports: [RouterLink],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css'
})
export class TooltipComponent {
  @Input() label : string = "";
  @Input() message : string = "";
  @Input() link: string = "";
}