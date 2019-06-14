import { Item } from './Item';

export class ZombieMarketSnapshot {
    private data: Item[];

    constructor(data: Item[]) {
        this.data = data;
    }

    public getItems(): Item[] {
        return this.data;
    }

    public getItemById(id: number): Item {
        return this.data.find(item => item.id === id);
    }
}
