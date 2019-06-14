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
    public one(@Param('id') id: string): Promise<Zombie | undefined> {
        return this.zombieService.findOne(id);
    }

    @Post()
    public create(@Body() zombie: Zombie): Promise<Zombie> {
        return this.zombieService.create(zombie);
    }

    @Put('/:id')
    public update(@Param('id') id: string, @Body() zombie: Zombie): Promise<Zombie> {
        return this.zombieService.update(id, zombie);
    }

    @Delete('/:id')
    public delete(@Param('id') id: string): Promise<void> {
        return this.zombieService.delete(id);
    }

}
