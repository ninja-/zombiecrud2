export class Item {
    public id: number;

    public name: string;

    public price: number;

    public toString(): string {
        return `${this.name}`;
    }
}
