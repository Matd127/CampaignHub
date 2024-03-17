export interface Campaign {
  id: number;
  name: string;
  keywords: Array<string>;
  bidAmount: number;
  campaignFund: number;
  status: boolean;
  town: string;
  radius: number;
}
