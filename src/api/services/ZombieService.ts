import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Zombie } from '../models/Zombie';
import { ZombieRepository } from '../repositories/ZombieRepository';

@Service()
export class ZombieService {

    constructor(
        @OrmRepository() private zombieRepository: ZombieRepository,
        // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public cleanupZombie<T extends any>(arg: T): T {
        if (!arg) {
            return arg;
        }

        // Remove itemsJSON manually
        if (Array.isArray(arg)) {
            arg.forEach(arg => delete arg.itemsJSON);
            return arg;
        }

        delete arg.itemsJSON;
        return arg;
    }

    public async find(): Promise<Zombie[]> {
        this.log.info('Find all zombies');
        return this.cleanupZombie(await this.zombieRepository.find());
    }

    public async findOne(id: string): Promise<Zombie | undefined> {
        this.log.info('Find one zombie');
        return this.cleanupZombie(await this.zombieRepository.findOne({ id }));
    }

    public async create(zombie: Zombie): Promise<Zombie> {
        this.log.info('Create a new zombie => ', zombie.toString());
        zombie.id = uuid.v1();
        const newZombie = await this.zombieRepository.save(zombie);
        return this.cleanupZombie(newZombie);
    }

    public update(id: string, zombie: Zombie): Promise<Zombie> {
        this.log.info('Update a zombie');
        zombie.id = id;
        return this.cleanupZombie(this.zombieRepository.save(zombie));
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a zombie');
        await this.zombieRepository.delete(id);
        return;
    }
}
