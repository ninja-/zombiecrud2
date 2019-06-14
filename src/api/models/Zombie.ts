import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryColumn, AfterLoad, BeforeInsert, BeforeUpdate } from 'typeorm';

import { Item } from './Item';
import { ZombieMarketService } from '../services/ZombieMarketService';
import { NbpService } from '../services/NbpService';

@Entity()
export class Zombie {
    @PrimaryColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    // @OneToMany(type => Item, item => item.zombie)
    // public items: Item[];

    @Column({type: 'text'})
    public itemsJSON: string;

    public items: Item[];

    @Column({type: 'decimal'})
    public inventoryValuePLN = 0;
    @Column({type: 'decimal'})
    public inventoryValueUSD = 0;
    @Column({type: 'decimal'})
    public inventoryValueEUR = 0;

    // Seems like dependency injection is not available in models. :(

    // constructor(
    //     private zombieMarket: ZombieMarketService
    // ) { }

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

    public async downloadPrices(marketService: ZombieMarketService, nbp: NbpService): Promise<void> {
        const market = await marketService.getItems();
        const rates = await nbp.getExchangeRates();
        this.inventoryValuePLN = 0;
        // console.log("market dump", market)
        for (const item of this.items) {
            const marketItem = market.getItemById(item.id);
            if (marketItem) {
                item.price = marketItem.price;
                item.name = marketItem.name;
                this.inventoryValuePLN += item.price;
            }
        }
        this.inventoryValueEUR = this.inventoryValuePLN * rates.eur;
        this.inventoryValueUSD = this.inventoryValuePLN * rates.usd;
    }

    public toString(): string {
        return `${this.name}`;
    }
}
