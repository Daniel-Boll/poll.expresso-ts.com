import type { StateCreator } from "zustand";

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  options: CampaignOptions[];
}

export interface CampaignOptions {
  name: string;
  votes: number;
}

export interface CampaignSlice {
  campaigns: Campaign[];
  currentCampaign?: Campaign;
  fetchCampaigns: () => void;
  setCurrentCampaign: (campaign?: Campaign) => void;
}

export const createCampaignSlice: StateCreator<CampaignSlice> = (set) => ({
  campaigns: [],
  currentCampaign: undefined,
  fetchCampaigns: () => {
    // TODO: Fetch all campaigns from API
    set({
      campaigns: [
        {
          id: "1",
          name: "Holopin Badges",
          description: "Choose the best design for the Holopin badges",
          options: [
            { name: "Option 1", votes: 1 },
            { name: "Option 2", votes: 2 },
          ],
        },
        {
          id: "2",
          name: "Deployment Plataform",
          description: "Choose the best deployment plataform",
          options: [
            { name: "Option 1", votes: 1 },
            { name: "Option 2", votes: 2 },
          ],
        },
      ],
    });
  },
  setCurrentCampaign: (campaign) => {
    set({ currentCampaign: campaign });
  },
});
