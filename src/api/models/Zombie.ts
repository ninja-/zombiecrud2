import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

// import { Item } from './Item';

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

    public toString(): string {
        return `${this.name}`;
    }
}
