import { Service } from 'typedi';
// import { OrmRepository } from 'typeorm-typedi-extensions';

// import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
// import { PetRepository } from '../repositories/PetRepository';
import { ExchangeRates } from '../models/ExchangeRates';
import {CacheService} from './CacheService';

import fetch from 'node-fetch';

const NBP_EXCHANGERATE_URL = 'http://api.nbp.pl/api/exchangerates/tables/C/today/';

@Service()
export class NbpService {
    constructor(
        private cacheService: CacheService,
        // @OrmRepository() private cacheRepository: CacheRepo/sitory,
        // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async fetchExchangeRates(): Promise<ExchangeRates> {
        const data = await fetch(NBP_EXCHANGERATE_URL).then(res => res.json());
        const usd = data[0].rates.find(x => x.code === 'USD').ask;
        const eur = data[0].rates.find(x => x.code === 'EUR').ask;
        return {usd, eur};
    }

    public getMidnight(): Date {
        const now = new Date();
        const night = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
        return night;
    }

    public async getExchangeRates(): Promise<ExchangeRates> {
        this.log.debug('getExchangeRates');

        const cached = await this.cacheService.getCache<ExchangeRates>('nbp');
        if (cached) {
            return cached;
        }

        const data = this.fetchExchangeRates();
        await this.cacheService.updateCacheValidTo('nbp', data, this.getMidnight(), true);
        return data;
    }
}
