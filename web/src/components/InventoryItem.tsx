import React from 'react';
import { useDrag } from 'react-dnd';
import { Item } from '../typings';
import { useItemsStore } from '@/store/items';
import { useControlStore } from '@/store/control';

const ItemTypes = {
  ITEM: 'item',
};

const InventoryItem: React.FC<{ 
  item: Item | undefined; 
  slot: number;
  inventory: {
    id: string,
    type: string,
    tab: number,
    allowed: string[],
    denied: string[]
  }
}> = ({ 
  item, 
  slot, 
  inventory 
}) => {
  const { Items } = useItemsStore();
  const { setCurrent } = useControlStore();
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.ITEM,
    item: () =>  item ? { item, slot, inventory } : null,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [item, slot, inventory]);

  const opacity = isDragging ? 0.5 : 1;

  const onClick = () => {
    setCurrent(item ? { type: inventory.type, ...item } : null);
  };

  // Ensure the item and Items[item.item] exist before rendering
  if (!item || !Items[item.item]) {
    return <div className='item' ref={dragRef} style={{ opacity }}> {/* Empty slot */} </div>;
  }

  return (
    <div
      onClick={onClick}
      ref={dragRef}
      className='item'
      style={{
        opacity,
        backgroundImage: `url(./images/${item.item}.png)`,
        backgroundSize: inventory.type == 'other' ? '7vh' : '8vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <>
        { Items[item.item].weight &&
          <p className='item-weight'>{ Items[item.item].weight } kg</p>
        }
        {/* <p className='item-name'>{ Items[item.item] && Items[item.item].label }</p> */}
      </>
    </div>
  );
};

export { InventoryItem };
