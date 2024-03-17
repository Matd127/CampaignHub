export interface Campaign {
  id: number;
  campaignName: string;
  keywords: Array<string>;
  bidAmount: number;
  campaignFound: number;
  status: boolean;
  town: string;
  radius: number;
}
