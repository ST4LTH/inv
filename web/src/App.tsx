import { useEffect, useState } from "react";
import { useNuiEvent } from "./hooks/useNuiEvent";
import InventoryControl from "./components/inventoryControl";
import { InventoryWrapper } from "./components/inventoryWrapper";
import { OtherInventoriesWrapper } from "./components/OtherInventoriesWrapper";
import { useInvStore } from "./store/inventories";
import { InventoryType, Item, ItemInfoType } from "./typings";
import { useItemsStore } from "./store/items";
import { post } from "./misc";
import { useControlStore } from "./store/control";

const App: React.FC = () => {
  const { setCurrent } = useControlStore();
  const { 
    plyInventories, 
    otherInventories, 
    setPlayerInv, 
    setOtherInv,
    addItem,
    setGroundItems,
    insertInventory
  } = useInvStore();
  const [ open, setOpen ] = useState<boolean>(false)
  const { 
    setItems
  } = useItemsStore();

  useNuiEvent<boolean>('openInventory', (data) => {
    setCurrent(null)
    setOpen(data)
  })

  useNuiEvent<InventoryType>('insertInventory', (data) => {
    insertInventory(data)
  })

  useNuiEvent<{ 
    plyInventories: InventoryType[]; 
    otherInventories: InventoryType[];
    items: { 
      [key: string]: ItemInfoType 
    };
  }>('setupInventory', ({ plyInventories, otherInventories, items }) => {
    setPlayerInv(plyInventories)
    setOtherInv(otherInventories)
    setItems(items)
  })

  useNuiEvent<Item[]>('setGround', (groundItems) => {
    setGroundItems(groundItems)
  })

  useNuiEvent<{ 
    inventoryId: string, 
    inventoryType: string, 
    item: Item
  }>('addItem', ({ inventoryId, inventoryType, item }) => {
    addItem(inventoryId, inventoryType, item)
  })

  useEffect(() => {
    const handleKeyDown = (event:any) => {
      if (event.key === 'Tab') {
        post('close')
        setOpen(false)
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  return (
    <>
      { open && 
        <div className="h-full">
          <div className="inventory-wrapper">
            <InventoryWrapper inventories={plyInventories} />
            <InventoryControl />
            <OtherInventoriesWrapper inventories={otherInventories} />
          </div>
        </div>
      }
    </>
  );
};

export default App;
