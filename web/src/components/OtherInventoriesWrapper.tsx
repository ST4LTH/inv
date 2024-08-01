import { InventoryType } from "@/typings";
import { useState } from "react";
import { InventoryGrid } from "./InventoryGrid";
import { useItemsStore } from "@/store/items";
import { Progress } from "./ui/progress";

const OtherInventoriesWrapper: React.FC<{ inventories: InventoryType[] }> = ({
    inventories,
}) => {
    const {
        Items
    } = useItemsStore();
    const [tabs, setTabs] = useState<number[]>([0])

    const toggleTabs = (index: number) => {
        setTabs(prevTabs =>
            prevTabs.includes(index)
                ? prevTabs.filter(t => t !== index)
                : [...prevTabs, index]
        );
    };

    const getTotalWeight = (index: number) => {
        const inventory = inventories[index];
        if (!inventory || !Array.isArray(inventory.items)) return 0;
    
        return inventory.items.reduce((totalWeight, slot) => {
            if (slot && Items[slot.item]) {
                return totalWeight + Items[slot.item].weight;
            }
            return totalWeight;
        }, 0);
    };
    


    return (
        <>
            <div className="other-inventories">
                {inventories.map((item, index) => (
                    <div key={index} className="inventory-window text-center">
                        <p onClick={() => { toggleTabs(index) }}>
                            {item.label}
                        </p>
                        <div className="text-end text-xs absolute right-0 top-0 p-2">
                            {getTotalWeight(index) + '/' + inventories[index].maxWeight} kg
                        </div>
                        {
                            tabs.includes(index) &&
                            <>
                                <Progress className="h-1 mb-1" value={getTotalWeight(index) / inventories[index].maxWeight * 100} />
                                <InventoryGrid totalWeight={getTotalWeight(index)} tab={index} inventory={item} />
                            </>
                        }
                    </div>
                ))}
            </div>
        </>
    );
};

export { OtherInventoriesWrapper };
