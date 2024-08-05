import React from 'react';
import { useDrop } from 'react-dnd';

const ItemTypes = {
    ITEM: 'item',
};

const DropSlot: React.FC<{ 
    slot: number,
    onDrop: (item: any, slot: number) => void,
    children: any 
}> = ({ slot, onDrop, children }) => {
    const [{ isOver }, dropRef] = useDrop({
        accept: ItemTypes.ITEM,
        drop: (item) => {
            onDrop(item, slot);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const backgroundColor = isOver ? '#6a6e79' : 'transparent';

    return (
        <div ref={dropRef} style={{ backgroundColor }} className={' rounded '}>
            {children}
        </div>
    );
};

export { DropSlot };
