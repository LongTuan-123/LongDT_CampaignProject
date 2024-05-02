export interface Campaign {
  information: {
    name: string;
    describe?: string;
  };
  subCampaigns: SubCampaign[];
}

export interface SubCampaign {
  id: string;
  name: string;
  status: boolean;
  ads: Advertisement[];
}

export interface Advertisement {
  id: string;
  adsName: string;
  quantity: number;
}

export interface ErrorList {
  informationName: boolean;
  subCampaignsList: string[];
  adsList: string[];
}
