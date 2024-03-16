import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { campaignReducer } from './campaign.reducer';

@NgModule({
  imports: [StoreModule.forFeature('campaign', campaignReducer)],
})

export class CampaignModule {}
