import { Action } from '@ngrx/store';
import { ActionTypes } from './campaign.action';
import { Campaign } from '../models/Campaign';

const dataFromLocalStorage = JSON.parse(
  localStorage.getItem('campaigns') || ''
);

const campaigns: Campaign[] = dataFromLocalStorage ?? [];

export function campaignReducer(state = campaigns, action: Action) {
  switch (action.type) {
    case ActionTypes.CreateCampaign:
      return state;
    case ActionTypes.EditCampaign:
      return state;
    case ActionTypes.DeleteCampaign:
      return state;
    default:
      return state;
  }
}
