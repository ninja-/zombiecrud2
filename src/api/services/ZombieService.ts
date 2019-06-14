import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Zombie } from '../models/Zombie';
import { ZombieRepository } from '../repositories/ZombieRepository';
import { ZombieMarketService } from './ZombieMarketService';
import { NbpService } from './NbpService';

@Service()
export class ZombieService {

    constructor(
        @OrmRepository() private zombieRepository: ZombieRepository,
        private zombieMarketService: ZombieMarketService,
        private nbpService: NbpService,
        // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async cleanupZombie<T extends any>(arg: T): Promise<T> {
        if (!arg) {
            return arg;
        }

        const data: Zombie[] = Array.isArray(arg) ? arg : [arg] as any[];

        for (const zombie of data) {
            // Refresh inventory prices

            await zombie.downloadPrices(this.zombieMarketService, this.nbpService);
            await this.zombieRepository.save(zombie); // Only saves in db if prices were modified

            delete zombie.itemsJSON;
        }

        return arg;
    }

    public async find(): Promise<Zombie[]> {
        this.log.info('Find all zombies');
        return await this.cleanupZombie(await this.zombieRepository.find());
    }

    public async findOne(id: string): Promise<Zombie | undefined> {
        this.log.info('Find one zombie');
        return await this.cleanupZombie(await this.zombieRepository.findOne({ id }));
    }

    public async create(zombie: Zombie): Promise<Zombie> {
        this.log.info('Create a new zombie => ', zombie.toString());
        zombie.id = uuid.v1();
        const newZombie = await this.zombieRepository.save(zombie);
        return await this.cleanupZombie(newZombie);
    }

    public async update(id: string, zombie: Zombie): Promise<Zombie> {
        this.log.info('Update a zombie');
        zombie.id = id;
        return await this.cleanupZombie(await this.zombieRepository.save(zombie));
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a zombie');
        await this.zombieRepository.delete(id);
        return;
    }
}
