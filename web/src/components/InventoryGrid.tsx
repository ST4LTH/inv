import { InventoryType } from "@/typings";
import { InventoryItem } from "./InventoryItem";
import { DropSlot } from "./dropSlot";
import React from "react";
import { useInvStore } from "@/store/inventories";
import { useItemsStore } from "@/store/items";
import { useControlStore } from "@/store/control";

const InventoryGrid: React.FC<{ inventory: InventoryType, tab: number, totalWeight:number }> = ({ inventory, tab, totalWeight }) => {
    const { 
        moveItem,
        swapItem
    } = useInvStore();
    const { 
        Items
    } = useItemsStore();
    const { 
        setCurrent
    } = useControlStore();

    const checkAllowed = (inventory: any, item: string) => {
        if (inventory.allowed 
            && inventory.allowed.length > 0 
            && !inventory.allowed.includes(Items[item].type)
        ) {
            return false; 
        }
        if (inventory.denied 
            && inventory.denied.length > 0 
            && inventory.denied.includes(Items[item].type)
        ) {
            return false; 
        }
        return true; 
    }

    const handleDrop = (droppedItem: any, slot: number) => {
        setCurrent(null)
        const sourceInv = droppedItem;
        const targetInv = inventory;
        const sourceItem = droppedItem.item;
        const targetItem = targetInv.items[slot];

        if (!sourceInv) { return }
        if (sourceInv.inventory.id === targetInv.id && droppedItem.slot === slot) { return }
        if (sourceInv.inventory.id !== targetInv.id &&
            (totalWeight + Items[sourceItem.item].weight) > targetInv.maxWeight
        ) {
            return
        }
        if ( sourceInv.inventory.id !== targetInv.id &&
            (totalWeight + Items[sourceItem.item].weight) > targetInv.maxWeight
        ) {
            return
        }

        if (!checkAllowed(targetInv, sourceItem.item)) { return }
        if (targetItem && !checkAllowed(sourceInv.inventory, targetItem.item)) { return }


        if (targetItem) {
            swapItem(sourceInv, targetInv, slot, tab);      
            return
        }

        moveItem(sourceInv, targetInv, slot, tab);
    };


    return (
        <div className="inventory-grid-container">
            {Array.from({ length: inventory.slots }).map((_, index) => (
                <DropSlot key={index} slot={index} onDrop={handleDrop}>
                    <InventoryItem 
                        item={inventory.items[index]} 
                        slot={index} 
                        inventory={{
                            id: inventory.id,
                            type: inventory.type,
                            tab: tab,
                            allowed: (inventory.allowed ? inventory.allowed : []),
                            denied: (inventory.denied ? inventory.denied : [])
                        }}
                        key={`${inventory.type}-${inventory.id}-${index}`}
                    />
                </DropSlot>
            ))}
        </div>
    );
};

export { InventoryGrid };
