import { EntityRepository, Repository } from 'typeorm';

import { Cache } from '../models/Cache';

@EntityRepository(Cache)
export class CacheRepository extends Repository<Cache>  {

}
