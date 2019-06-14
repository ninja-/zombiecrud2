import { Connection } from 'typeorm';
import { Factory, Seed } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { Zombie } from '../../../src/api/models/Zombie';

export class CreateBruce implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<Zombie> {
        // const userFactory = factory<User, { role: string }>(User as any);
        // const adminUserFactory = userFactory({ role: 'admin' });

        // const bruce = await adminUserFactory.make();
        // console.log(bruce);

        // const bruce2 = await adminUserFactory.seed();
        // console.log(bruce2);

        // const bruce3 = await adminUserFactory
        //     .map(async (e: User) => {
        //         e.firstName = 'Bruce';
        //         return e;
        //     })
        //     .seed();
        // console.log(bruce3);

        // return bruce;

        // const connection = await factory.getConnection();
        const em = connection.createEntityManager();

        const user = new Zombie();
        user.id = uuid.v1();
        user.name = 'Bruce';
        user.items = [{id: 1, name: "Some item", price: 9001}]
        return await em.save(user);
    }

}
