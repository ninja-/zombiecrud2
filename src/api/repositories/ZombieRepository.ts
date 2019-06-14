import { EntityRepository, Repository } from 'typeorm';

import { Zombie } from '../models/Zombie';

@EntityRepository(Zombie)
export class ZombieRepository extends Repository<Zombie>  {

}
