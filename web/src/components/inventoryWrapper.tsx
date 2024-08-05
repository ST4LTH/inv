import { InventoryType } from "@/typings"
import { useState } from "react"
import { Button } from "./ui/button"
import { InventoryGrid } from "./InventoryGrid"
import { useItemsStore } from "@/store/items"
import { Progress } from "./ui/progress"
import { ArchiveIcon, BookmarkIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

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
    <div className="inventory-container">
      <div className="inventory-tabs flex flex-col gap-1 p-1 bg-primary h-full rounded mr-1">
        {inventories.map((item, index) => (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  key={index} 
                  onClick={ () => { setTab(index) } }
                  className={
                    'h-7 rounded tab bg-transparent m-0 w-10 h-9 ' 
                    + 
                    ( tab == index ? 'border active border-transparent' : 'hover:border' )
                  }
                  size={'icon'}
                >
                  {
                    item.id == 'player' && <ArchiveIcon />
                  }
                  {
                    item.id == 'keys' && <BookmarkIcon />
                  }
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <div className="inventory-window rounded">
        <InventoryGrid totalWeight={getTotalWeight(tab)} tab={tab} inventory={ inventories[tab] } />
        <div className="flex items-center pt-1">
          <Progress className="h-[0.7vh] mx-1 rounded w-full" value={totalWeight/inventories[tab].maxWeight*100} />
          <p className="text-end text-[1vh] w-[7vh]">
            { totalWeight + ' / ' + inventories[tab].maxWeight + ' kg' }
          </p>
        </div>
      </div>
    </div>
  )
}

export { InventoryWrapper }