import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import {CacheService} from './CacheService';

import fetch from 'node-fetch';
import { Item } from '../models/Item';
import { ZombieMarketSnapshot } from '../models/ZombieMarketSnapshot';

const ZOMBIEMARKET_URL = 'https://zombie-items-api.herokuapp.com/api/items';
@Service()
export class ZombieMarketService {
    constructor(
        private cacheService: CacheService,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async fetchItems(): Promise<Item[]> {
        const data = await fetch(ZOMBIEMARKET_URL).then(res => res.json());
        return data.items || [];
    }

    public getMidnight(): Date {
        const now = new Date();
        const night = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
        return night;
    }

    public async getItems(): Promise<ZombieMarketSnapshot> {
        this.log.debug('getItems');

        const cached = await this.cacheService.getCache<Item[]>('market');
        if (cached) {
            return new ZombieMarketSnapshot(cached);
        }

        const data = await this.fetchItems();
        await this.cacheService.updateCacheValidTo('market', data, this.getMidnight(), true);
        return new ZombieMarketSnapshot(data);
    }
}
