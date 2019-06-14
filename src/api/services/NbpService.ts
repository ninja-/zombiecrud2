import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { ExchangeRates } from '../models/ExchangeRates';
import {CacheService} from './CacheService';

import fetch from 'node-fetch';

const NBP_EXCHANGERATE_URL = 'http://api.nbp.pl/api/exchangerates/tables/C/';

@Service()
export class NbpService {
    constructor(
        private cacheService: CacheService,
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

        const data = await this.fetchExchangeRates();
        await this.cacheService.updateCacheValidTo('nbp', data, this.getMidnight(), true);
        return data;
    }
}
