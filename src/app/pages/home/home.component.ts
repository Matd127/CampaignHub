import { Component } from '@angular/core';
import { CampaignsComponent } from '../../components/campaigns/campaigns.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CampaignsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
