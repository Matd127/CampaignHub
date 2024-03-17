import { Action } from '@ngrx/store';
import { Campaign } from '../models/Campaign';

export enum ActionTypes {
  ReadCampaigns = '[Campaign] ReadCampaigns',
  CreateCampaign = '[Campaign] CreateCampaign',
  EditCampaign = '[Campaign] EditCampaign',
  DeleteCampaign = '[Campaign] DeleteCampaign',
}

export class CreateCampaign implements Action {
  readonly type = ActionTypes.CreateCampaign;

  constructor(public payload: Campaign) {}
}

export class EditCampaign implements Action {
  readonly type = ActionTypes.EditCampaign;

  constructor(public payload: { id: number }) {}
}

export class DeleteCampaign implements Action {
  readonly type = ActionTypes.DeleteCampaign;

  constructor(public payload: { id: number }) {}
}

export class ReadCampaigns implements Action {
  readonly type = ActionTypes.ReadCampaigns;
}
