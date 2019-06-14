import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryColumn, AfterLoad, BeforeInsert, BeforeUpdate } from 'typeorm';

import { Item } from './Item';

@Entity()
export class Zombie {

    @PrimaryColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    // @OneToMany(type => Item, item => item.zombie)
    // public items: Item[];

    @Column()
    public itemsJSON: string;

    public items: Item[];

    @AfterLoad()
    public parse(): void {
        if (this.itemsJSON) {
            this.items = JSON.parse(this.itemsJSON) as Item[];
            delete this.itemsJSON;
        } else {
            this.items = [];
        }
    }

    @BeforeInsert()
    @BeforeUpdate()
    public stringify(): void {
        this.itemsJSON = JSON.stringify(this.items);
    }

    public toString(): string {
        return `${this.name}`;
    }
}
