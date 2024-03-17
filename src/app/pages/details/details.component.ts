import { Component } from '@angular/core';
import { DetailsCardComponent } from '../../components/details-card/details-card.component';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [DetailsCardComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {}
