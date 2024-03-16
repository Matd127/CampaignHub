import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddCampaignComponent } from './pages/add-campaign/add-campaign.component';
import { DetailsComponent } from './pages/details/details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'create',
    component: AddCampaignComponent,
  },
  {
    path: 'campaign/:id',
    component: DetailsComponent,
  },
];
