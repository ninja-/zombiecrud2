import {
    Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { ZombieNotFoundError } from '../errors/ZombieNotFoundError';
import { Zombie } from '../models/Zombie';
import { ZombieService } from '../services/ZombieService';

@JsonController('/zombies')
export class ZombieController {

    constructor(
        private zombieService: ZombieService
    ) { }

    @Get()
    public find(): Promise<Zombie[]> {
        return this.zombieService.find();
    }

    @Get('/:id')
    @OnUndefined(ZombieNotFoundError)
    public async one(@Param('id') id: string): Promise<Zombie | undefined> {
        return this.zombieService.findOne(id);
    }

    @Post()
    public async create(@Body() zombie: Zombie): Promise<Zombie> {
        console.log(zombie);
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
