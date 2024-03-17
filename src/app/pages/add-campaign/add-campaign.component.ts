import { Component } from '@angular/core';
import { CampaignFormComponent } from '../../components/campaign-form/campaign-form.component';

@Component({
  selector: 'app-add-campaign',
  standalone: true,
  imports: [CampaignFormComponent],
  templateUrl: './add-campaign.component.html',
  styleUrl: './add-campaign.component.scss',
})
export class AddCampaignComponent {}
