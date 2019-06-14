import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { createConnection, getConnectionOptions } from 'typeorm';

import { env } from '../env';

export const typeormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {

    console.log("type1");
    const loadedConnectionOptions = await getConnectionOptions();
    console.log("type2");

    const connectionOptions = Object.assign(loadedConnectionOptions, {
        type: env.db.type as any, // See createConnection options for valid types
        host: env.db.host,
        port: env.db.port,
        username: env.db.username,
        password: env.db.password,
        database: env.db.database,
        synchronize: env.db.synchronize,
        logging: env.db.logging,
        entities: env.app.dirs.entities,
        migrations: env.app.dirs.migrations,
    });
    process.exit(1);
    console.log("type3");

    const connection = await createConnection(connectionOptions);
    console.log("type4");

    if (settings) {
        console.log("db conn to", connectionOptions);
        settings.setData('connection', connection);
        settings.onShutdown(() => connection.close());
    }
};
