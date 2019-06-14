import {
    Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { ZombieNotFoundError } from '../errors/ZombieNotFoundError';
import { Zombie } from '../models/Zombie';
import { ZombieService } from '../services/ZombieService';
import { NbpService } from '../services/NbpService';

@JsonController('/zombies')
export class ZombieController {

    constructor(
        private zombieService: ZombieService,
        private nbpService: NbpService
    ) { }

    @Get()
    public find(): Promise<Zombie[]> {
        return this.zombieService.find();
    }

    @Get('/debug/nbp')
    public async nbp(): Promise<any> {
        return this.nbpService.getExchangeRates();
    }

    @Get('/:id')
    @OnUndefined(ZombieNotFoundError)
    public async one(@Param('id') id: string): Promise<Zombie | undefined> {
        return this.zombieService.findOne(id);
    }

    @Post()
    public async create(@Body() zombie: Zombie): Promise<Zombie> {
        return await this.zombieService.create(zombie);
    }

    @Put('/:id')
    public async update(@Param('id') id: string, @Body() zombie: Zombie): Promise<Zombie> {
        return await this.zombieService.update(id, zombie);
    }

    @Delete('/:id')
    public async delete(@Param('id') id: string): Promise<any> {
        await this.zombieService.delete(id);
        return {message: 'Zombie deleted'};
    }

}
