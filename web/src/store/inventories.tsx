import { post } from "@/misc";
import { InventoryType, Item } from "@/typings";
import { create } from 'zustand';

export interface InvStoreType {
    plyInventories: InventoryType[];
    otherInventories: InventoryType[];
    setPlayerInv: (data: InventoryType[]) => void;
    setOtherInv: (data: InventoryType[]) => void;
    setGroundItems: (data: Item[]) => void;
    insertInventory: (data: InventoryType) => void;
    addItem: (
        inventoryId: string, 
        inventoryType: string, 
        item: Item,
    ) => void;
    moveItem: (
        sourceInv: any,
        targetInv: InventoryType,
        slot: number,
        tab: number,
    ) => void;
    swapItem: (
        sourceInv: any,
        targetInv: InventoryType,
        slot: number,
        tab: number
    ) => void;
    getInventoriesHelper: (
        sourceInv: { type: string; tab: number; item: any; slot: number },
        targetInv: { type: string },
        tab: number
    ) => [InventoryType, InventoryType];
    getInventories: (
        sourceInv: { type: string; tab: number; item: any; slot: number },
        targetInv: { type: string },
        tab: number
    ) => [InventoryType, InventoryType];
    getInventoryById: (
        inventoryId: string, 
        inventoryType: string
    ) => InventoryType | undefined;
    findNextEmptySlot: (
        items: Item[]
    ) => number;
    findItemSlot: (
        items: Item[],
        item: string
    ) => number;
}

export const useInvStore = create<InvStoreType>()((set) => ({
    plyInventories: [
        {
            label: "Fickan",
            type: 'player',
            id: 'player-1212513',
            maxWeight: 50,
            slots: 30,
            denied: ['key'],
            items: [
                {   
                    id: 134523452345345,
                    item: 'sandwich'
                },
                undefined,
                {   
                    id: 134523452345345,
                    item: 'sandwich'
                },
            ]
        },
    ],
    otherInventories: [
        {
            maxWeight: 50,
            label: "Marken",
            type: 'other',
            id: 'ground',
            slots: 15,
            items: [
                {
                    id: 134523452345345,
                    item: 'sandwich',
                },
            ]
        },
        {
            maxWeight: 50,
            label: "Ryggsäck",
            type: 'other',
            id: 'huashgdkiuahs',
            slots: 15,
            items: [
                {
                    id: 134523452345345,
                    item: 'sandwich',
                },
            ]
        },
    ],
    setPlayerInv: (data): void => set(() => ({
        plyInventories: data
    })),
    setOtherInv: (data): void => set(() => ({
        otherInventories: data
    })),
    setGroundItems: (items): void => set(() => {
        const state = useInvStore.getState();
        state.otherInventories[0].items = items;

        return {};
    }),
    findNextEmptySlot: (items) => {
        for (let i = 0; i < items.length+1; i++) {
            if (!items[i]) {
                return i
            }
        }
        return -1
    },
    findItemSlot: (items, item) => {
        for (let i = 0; i < items.length+1; i++) {
            if (items[i] && items[i]?.item == item) {
                return i
            }
        }
        return -1
    },
    getInventoryById: (
        inventoryId: string, 
        inventoryType: string
    ): InventoryType|undefined => {
        const state = useInvStore.getState();
        let inventories = state.plyInventories;
    
        if (inventoryType === 'other') {
            inventories = state.otherInventories;
        }
    
        for (let i = 0; i < inventories.length; i++) {
            if (inventories[i].id === inventoryId) {
                return inventories[i];
            }
        }
    
        return undefined; 
    },    
    getInventories: (
        sourceInv,
        targetInv,
        tab
    ): [InventoryType, InventoryType] => {
        return useInvStore.getState().getInventoriesHelper(sourceInv, targetInv, tab);
    },
    getInventoriesHelper: (
        sourceInv,
        targetInv,
        tab
    ): [InventoryType, InventoryType] => {
        const state = useInvStore.getState();
        let sourceInventory = state.plyInventories[sourceInv.tab];
        let targetInventory = state.plyInventories[tab];

        if (sourceInv.type === 'other') {
            sourceInventory = state.otherInventories[sourceInv.tab];
        }
        if (targetInv.type === 'other') {
            targetInventory = state.otherInventories[tab];
        }

        return [sourceInventory, targetInventory];
    },
    insertInventory: (
        inventory
    ): void => set((state: InvStoreType) =>  {
        state.otherInventories.push(inventory)

        return {}
    }),
    addItem: (
        inventoryId, inventoryType, item
    ): void => set((state: InvStoreType) =>  {
        if (!item) return {}
        let Inventory = state.getInventoryById(inventoryId, inventoryType)

        if (!Inventory) return {}

        let index = state.findNextEmptySlot(Inventory.items)

        Inventory.items[index] = item

        return {}
    }),
    moveItem: (
        sourceInv,
        targetInv,
        slot,
        tab,
    ): void => set((state: InvStoreType) => {
        const [sourceInventory, targetInventory] = state.getInventoriesHelper(sourceInv.inventory, targetInv, tab);

        sourceInventory.items[sourceInv.slot] = undefined;
        targetInventory.items[slot] = sourceInv.item;
        post('moveItem', {
            sourceInv: sourceInventory,
            targetInv: targetInventory,
            item: sourceInv,
            slot: slot
        })
        return {};
    }),
    swapItem: (
        sourceInv,
        targetInv,
        slot,
        tab
    ): void => set((state: InvStoreType) => {
        const [sourceInventory, targetInventory] = state.getInventoriesHelper(sourceInv.inventory, targetInv, tab);
        const sourceItem = sourceInv.item;
        const targetItem = targetInventory.items[slot];

        if (!targetItem) {
            return {};
        }

        sourceInventory.items[sourceInv.slot] = targetItem;
        targetInventory.items[slot] = sourceItem;
        post('swapItem', {
            sourceInv: sourceInventory,
            targetInv: targetInventory,
            item: sourceInv,
            targetItem: targetItem,
            slot: slot
        })
        return {};
    }),
}));
