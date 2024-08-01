import { Item } from "@/typings";
import { create } from 'zustand';

type currentItemType = Item & { type: string };

export interface ControlStoreType {
    current: currentItemType | null,
    setCurrent: (item: currentItemType | null) => void,
}

export const useControlStore = create<ControlStoreType>()((set) => ({
    current: null,
    setCurrent: (item): void => set((state: ControlStoreType) => {
        return {
            current: item,
        };
    }),
}));

/* export const getInventoryById = (tabId:string) => {
    for (let i = 0; i < inventories.length; i++) {
        if (inventories[i].id === tabId) {
            return inventories[i]
        }
    }
} */