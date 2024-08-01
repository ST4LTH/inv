import { ItemInfoType } from "@/typings";
import { create } from 'zustand';

export interface ItemsStoreType {
    Items: {
        [key: string]: ItemInfoType;
    };
    setItems: (
        data: { 
            [key: string]: ItemInfoType 
        }
    ) => void;
}

export const useItemsStore = create<ItemsStoreType>()((set) => ({
    Items: {
        sandwich: {
            label: 'Sandwich',
            weight: 10,
            buttons: [
                {
                    label: 'Ät',
                    id: 'eat'
                }
            ]
        },
        carkey: {
            label: 'Bilnyckel',
            weight: 10,
            type: 'key',
        }
    },
    setItems: (data): void => set(() => ({
        Items: data
    })),
}));

/* export const getInventoryById = (tabId:string) => {
    for (let i = 0; i < inventories.length; i++) {
        if (inventories[i].id === tabId) {
            return inventories[i]
        }
    }
} */