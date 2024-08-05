import { useControlStore } from "@/store/control";
import { Button } from "./ui/button"
import { useItemsStore } from "@/store/items";
import { ItemInfoType } from "@/typings";

const InventoryControl = () => {
    const { 
        current
    } = useControlStore();
    const { 
        Items
    } = useItemsStore();

    if (!current) {
        return <div className="inventory-control opacity-0"></div>;
    }

    const currentItem: ItemInfoType | undefined = Items[current.item];

    return (
        <> 
            {
                current ? 
                <div className="inventory-control">
                    <p className="text-lg">
                        { currentItem.label }
                    </p>
                    <div className='image' style={{ 
                        backgroundImage: `url(./images/${ current.item }.png)`,
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center', 
                        backgroundRepeat: 'no-repeat' 
                    }}>
                    
                    </div>
                    <p className="text-sm w-full">
                        { currentItem?.desc }
                    </p>
                    {
                        current.type == 'player' && currentItem?.buttons && 
                        <div className="w-full text-start">
                            {
                                currentItem.buttons.map((item, index) => (
                                    <Button 
                                        key={index} 
                                        onClick={ () => {  } }
                                    >
                                        { item.label }
                                    </Button>
                                ))
                            }
                        </div>
                    }
                </div>
                : <div className="inventory-control opacity-0"></div>
            }
        </>
    )
}

export default InventoryControl