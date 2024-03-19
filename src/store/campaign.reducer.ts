import { Action } from '@ngrx/store';
import { ActionTypes, CreateCampaign, DeleteCampaign } from './campaign.action';
import { Campaign } from '../models/Campaign';

const dataFromLocalStorage = localStorage?.getItem('campaigns') || '';
const existingData = dataFromLocalStorage && JSON.parse(dataFromLocalStorage);

const campaigns: Campaign[] = existingData
  ? existingData
  : [
      {
        id: 1010858033631,
        name: 'Summer Sale',
        keywords: ['Summer', 'Sale', 'Discount'],
        bidAmount: 0.5,
        campaignFund: 100,
        status: false,
        town: 'Krakow',
        radius: 10,
      },
      {
        id: 1010858033632,
        name: 'Holiday Campaign',
        keywords: ['Holiday', 'Gift'],
        bidAmount: 0.7,
        campaignFund: 200,
        status: false,
        town: 'Warsaw',
        radius: 15,
      },
    ];

export function campaignReducer(state = campaigns, action: Action) {
  switch (action.type) {
    case ActionTypes.ReadCampaigns:
      console.log(existingData ? '1' : '0');

      return state;

    case ActionTypes.CreateCampaign:
      const createAction = action as CreateCampaign;
      const newCampaign = [...state, createAction.payload];
      localStorage.setItem('campaigns', JSON.stringify(newCampaign));
      return newCampaign;

    case ActionTypes.EditCampaign:
      const editAction = action as CreateCampaign;
      const updatedCampain = editAction.payload;

      const updatedCampaigns = state.map((campaign) => {
        if (campaign.id === updatedCampain.id) {
          return {
            id: updatedCampain.id,
            name: updatedCampain.name,
            keywords: updatedCampain.keywords,
            bidAmount: updatedCampain.bidAmount,
            campaignFund: updatedCampain.campaignFund,
            town: updatedCampain.town,
            radius: updatedCampain.radius,
            status: updatedCampain.status,
          };
        } else {
          return campaign;
        }
      });
      localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
      return updatedCampaigns;
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
