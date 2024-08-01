
export type Item = {
    id: number;
    item: string;
    weight?: number;
    metadata?: any;
} | undefined

export type InventoryType = {
    label: string;
    id: string;
    type: string;
    slots: number;
    items: Item[];
    maxWeight: number;
    allowed?: string[];
    denied?: string[];
}

export type buttonType = {
    label: string;
    id: string;
};

export type ItemInfoType = {
    label: string;
    weight: number;
    model?: string;
    type?: string;
    desc?: string;
    buttons?: buttonType[];
};
