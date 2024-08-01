import { InventoryType } from "@/typings"
import { useState } from "react"
import { Button } from "./ui/button"
import { InventoryGrid } from "./InventoryGrid"
import { useItemsStore } from "@/store/items"
import { Progress } from "./ui/progress"

const InventoryWrapper: React.FC<{ inventories: InventoryType[] }> = ({ inventories }) => {
  const [tab, setTab] = useState<number>(0)

  const { 
      Items
  } = useItemsStore();

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



  const totalWeight = getTotalWeight(tab)
  return (
    <div className="inventory-window">
      <div className="flex gap-1">
        {inventories.map((item, index) => (
          <Button 
            key={index} 
            onClick={ () => { setTab(index) } }
            className={'hover:bg-zinc-600 rounded-full h-7 ' + ( tab == index && 'bg-zinc-700' )}
          >
            { item.label }
          </Button>
        ))}
      </div>
      <div className="text-end text-xs absolute right-0 top-0 p-1">
        { totalWeight + '/' + inventories[tab].maxWeight } kg
      </div>
      <Progress className="h-1 my-1" value={totalWeight/inventories[tab].maxWeight*100} />
      <InventoryGrid totalWeight={getTotalWeight(tab)} tab={tab} inventory={ inventories[tab] } />
    </div>
  )
}

export { InventoryWrapper }