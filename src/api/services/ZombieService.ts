import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

// import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Zombie } from '../models/Zombie';
import { ZombieRepository } from '../repositories/ZombieRepository';
// import { events } from '../subscribers/events';

@Service()
export class ZombieService {

    constructor(
        @OrmRepository() private zombieRepository: ZombieRepository,
        // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Zombie[]> {
        this.log.info('Find all zombies');
        return this.zombieRepository.find({ relations: ['items'] });
    }

    public findOne(id: string): Promise<Zombie | undefined> {
        this.log.info('Find one zombie');
        return this.zombieRepository.findOne({ id });
    }

    public async create(zombie: Zombie): Promise<Zombie> {
        this.log.info('Create a new zombie => ', zombie.toString());
        zombie.id = uuid.v1();
        for (let items of zombie.items) {
            
        }
        const newZombie = await this.zombieRepository.save(zombie);
        // this.eventDispatcher.dispatch(events.zombie.created, newZombie);
        return newZombie;
    }

    public update(id: string, zombie: Zombie): Promise<Zombie> {
        this.log.info('Update a zombie');
        zombie.id = id;
        return this.zombieRepository.save(zombie);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a zombie');
        await this.zombieRepository.delete(id);
        return;
    }

}
