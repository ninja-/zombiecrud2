// import { IsNotEmpty } from 'class-validator';
// import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

// import { Zombie } from './Zombie';

// @Entity()
export class Item {
    // @PrimaryColumn('uuid')
    public id: number;

    // @IsNotEmpty()
    // @Column()
    public name: string;

    public price: number;

    // @IsNotEmpty()
    // @Column()
    // public age: number;

    // @Column({
    //     name: 'zombie_id',
    //     nullable: true,
    // })
    // public zombieId: string;

    // @ManyToOne(type => Zombie, zombie => zombie.items)
    // @JoinColumn({ name: 'zombie_id' })
    // public zombie: Zombie;

    public toString(): string {
        return `${this.name}`;
    }

}
