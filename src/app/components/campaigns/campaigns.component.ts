import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { CampaignsTableComponent } from '../campaigns-table/campaigns-table.component';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [ButtonComponent, CampaignsTableComponent],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss',
})
export class CampaignsComponent {}
