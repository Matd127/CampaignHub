import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() title: string = '';
  // @Input() disabled: boolean = false;
  @Input() link: string | null = null;
  @Input() isDisabled: boolean = false;
}
