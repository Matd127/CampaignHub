import { Action } from '@ngrx/store';
import { ActionTypes, CreateCampaign, DeleteCampaign } from './campaign.action';
import { Campaign } from '../models/Campaign';

const dataFromLocalStorage = localStorage?.getItem('campaigns') || '';
const existingData = dataFromLocalStorage && JSON.parse(dataFromLocalStorage);

const campaigns: Campaign[] = existingData;

export function campaignReducer(state = campaigns, action: Action) {
  switch (action.type) {
    case ActionTypes.ReadCampaigns:
      return state;

    case ActionTypes.CreateCampaign:
      const createAction = action as CreateCampaign;
      const newCampaign = [...state, createAction.payload];
      localStorage.setItem('campaigns', JSON.stringify(newCampaign));
      return newCampaign;

    case ActionTypes.EditCampaign:
      return state;
    case ActionTypes.DeleteCampaign:
      const deleteAction = action as DeleteCampaign;
      const { id } = deleteAction.payload;
      const filteredCampaigns = state.filter((campaign) => campaign.id !== id);
      localStorage.setItem('campaigns', JSON.stringify(filteredCampaigns));
      return filteredCampaigns;
    default:
      return state;
  }
}
