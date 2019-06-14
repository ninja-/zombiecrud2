import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Cache {

    @PrimaryColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column()
    public value: string;

    @IsNotEmpty()
    @CreateDateColumn({type: 'timestamp'})
    public updated: Date;

    @Column()
    public ttlSeconds: number;

    public toString(): string {
        return `${this.id}`;
    }

    public isValid(): boolean {
        if (new Date().getTime() - this.updated.getTime() > this.ttlSeconds * 1000) {
            return false; // ttl expired
        }
        return true;
    }
}
