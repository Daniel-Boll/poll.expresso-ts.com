import { create } from "zustand";
import { CampaignSlice, createCampaignSlice } from "./slices/campaign";

type StoreState = CampaignSlice;

export const useAppStore = create<StoreState>()((...args) => ({
  ...createCampaignSlice(...args),
}));
