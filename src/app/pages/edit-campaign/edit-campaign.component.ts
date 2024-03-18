import { Component } from '@angular/core';
import { CampaignFormComponent } from '../../components/campaign-form/campaign-form.component';

@Component({
  selector: 'app-edit-campaign',
  standalone: true,
  imports: [CampaignFormComponent],
  templateUrl: './edit-campaign.component.html',
  styleUrl: './edit-campaign.component.scss',
})
export class EditCampaignComponent {}
