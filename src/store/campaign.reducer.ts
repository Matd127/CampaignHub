import { Action } from '@ngrx/store';
import { ActionTypes, CreateCampaign, DeleteCampaign } from './campaign.action';
import { Campaign } from '../models/Campaign';

const dataFromLocalStorage = localStorage?.getItem('campaigns') || '';
const existingData = dataFromLocalStorage && JSON.parse(dataFromLocalStorage);

const campaigns: Campaign[] = existingData;
//  [
//   {
//     id: 1,
//     name: 'Summer Sale',
//     keywords: ['summer', 'sale', 'discount'],
//     bidAmount: 0.5,
//     campaignFund: 100,
//     status: false,
//     town: 'Krakow',
//     radius: 10,
//   },
//   {
//     id: 2,
//     name: 'Holiday Campaign',
//     keywords: ['holiday', 'gift', 'promotion'],
//     bidAmount: 0.7,
//     campaignFund: 200,
//     status: false,
//     town: 'Warsaw',
//     radius: 15,
//   },
// ];

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
