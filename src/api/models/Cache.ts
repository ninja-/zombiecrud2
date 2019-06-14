import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryColumn, BeforeInsert, BeforeUpdate, AfterLoad } from 'typeorm';

@Entity()
export class Cache {

    @PrimaryColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column({type: 'text'})
    public value: string;

    @IsNotEmpty()
    @Column()
    public updated: Date;

    @Column()
    public ttlSeconds: number;

    public valueObject: any;

    public toString(): string {
        return `${this.id}`;
    }

    @AfterLoad()
    public parse(): void {
        if (this.value) {
            this.valueObject = JSON.parse(this.value) as any;
        }
    }

    @BeforeInsert()
    @BeforeUpdate()
    public stringify(): void {
        this.value = JSON.stringify(this.valueObject);
    }

    public isValid(): boolean {
        if (new Date().getTime() - this.updated.getTime() > this.ttlSeconds * 1000) {
            return false; // ttl expired
        }
        return true;
    }
}
