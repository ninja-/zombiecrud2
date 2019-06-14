import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

// import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import {Cache} from '../models/Cache';
import { CacheRepository } from '../repositories/CacheRepository';

@Service()
export class CacheService {
    private memoryCache: {[key: string]: Cache} = {};

    constructor(
        @OrmRepository() private cacheRepository: CacheRepository,
        // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async updateCache(key: string, data: any, ttlSeconds: number, inMemory?: boolean): Promise<void> {
        const cache = new Cache();
        cache.id = key;
        cache.valueObject = data;
        cache.updated = new Date();
        cache.ttlSeconds = ttlSeconds;

        if (inMemory) {
            this.memoryCache[key] = cache;
        }

        this.log.info('Updating cache for ' + key, cache);
        await this.cacheRepository.save(cache);
    }

    public async updateCacheValidTo(key: string, data: any, validTo: Date, inMemory?: boolean): Promise<void> {
        return await this.updateCache(key, data, validTo.getTime() - new Date().getTime(), inMemory);
    }

    public async getCache<T>(id: string, inMemory?: boolean): Promise<T> {
        const memory = this.memoryCache[id];
        if (memory) {
            if (!memory.isValid()) {
                delete this.memoryCache[id];
            } else {
                return memory.valueObject as T;
            }
        }

        this.log.info('Find cache ' + id);
        const cache = await this.cacheRepository.findOne( {id} );
        if (!cache || !cache.isValid()) {
            this.log.info('Cache miss for ' + id);
            return undefined; // ttl expired
        }
        if (inMemory) {
            this.memoryCache[id] = cache;
        }

        this.log.info('Returning cached for ' + id);
        return cache.valueObject as any as T;
    }
}
