import { Action } from '@ngrx/store';
import { Campaign } from '../models/Campaign';

export enum ActionTypes {
  CreateCampaign = '[Campaign] Create',
  EditCampaign = '[Campaign] Edit',
  DeleteCampaign = '[Campaign] Delete',
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
