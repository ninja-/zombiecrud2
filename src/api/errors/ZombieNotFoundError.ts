import { HttpError } from 'routing-controllers';

export class ZombieNotFoundError extends HttpError {
    constructor() {
        super(404, 'Zombie not found!');
    }
}
