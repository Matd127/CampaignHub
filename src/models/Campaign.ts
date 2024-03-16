export interface Campaign {
  id: number;
  campaignName: string;
  keywords: Array<string>;
  bidAmount: number;
  campaignFound: number;
  status: 'On' | 'Off';
  town: string;
  radius: number;
}
