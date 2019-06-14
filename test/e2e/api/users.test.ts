jest.setTimeout(999999);

import * as nock from 'nock';
import request from 'supertest';
import { runSeed } from 'typeorm-seeding';

import { Zombie } from '../../../src/api/models/Zombie';
import { CreateBruce } from '../../../src/database/seeds/CreateBruce';
import { closeDatabase } from '../../utils/database';
import { BootstrapSettings } from '../utils/bootstrap';
import { prepareServer } from '../utils/server';

describe('/api/zombies', () => {

    let bruce: Zombie;
    let bruceAuthorization: string;
    let settings: BootstrapSettings;

    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------

    beforeAll(async () => {
        settings = await prepareServer({ migrate: true });
        bruce = await runSeed<Zombie>(CreateBruce);
        bruceAuthorization = Buffer.from(`${bruce.name}:1234`).toString('base64');
    });

    // -------------------------------------------------------------------------
    // Tear down
    // -------------------------------------------------------------------------

    afterAll(async () => {
        nock.cleanAll();
        await closeDatabase(settings.connection);
    });

    // -------------------------------------------------------------------------
    // Test cases
    // -------------------------------------------------------------------------

    // One zombie is seeded to the database before tests

    test('GET: / should return a list of zombies', async (done) => {
        const response = await request(settings.app)
            .get('/api/zombies')
            // .set('Authorization', `Basic ${bruceAuthorization}`)
            .expect('Content-Type', /json/)
            .expect(200);

            console.log(response.body);
        expect(response.body.length).toBe(1);
        expect(response.body[0].id).toBe(bruce.id);
        expect(response.body[0].name).toBe(bruce.name);

        done();
    });

    test('GET: /:id should return zombie bruce', async (done) => {
        const response = await request(settings.app)
            .get(`/api/zombies/${bruce.id}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.id).toBe(bruce.id);
        expect(response.body.name).toBe(bruce.name);
        // expect(response.body.lastName).toBe(bruce.lastName);
        // expect(response.body.email).toBe(bruce.email);
        done();
    });

    test('POST: / should create a zombie', async (done) => {
        const response = await request(settings.app)
            .post(`/api/zombies/`)
            .send({name: "John", items: [{id: 2}, {id: 1}]})
            .expect('Content-Type', /json/)
            .expect(200);

        // expect(response.body.id).toBe(bruce.id);
        expect(response.body.name).toBe("John");
        // expect(response.body.lastName).toBe(bruce.lastName);
        // expect(response.body.email).toBe(bruce.email);
        done();
    });

    test('DELETE: /:id should delete a zombie', async (done) => {
        const response = await request(settings.app)
            .post(`/api/zombies/`)
            .send({name: "John Wick", id:"del", items: [{id: 2}, {id: 1}]})
            .expect('Content-Type', /json/)
            .expect(200);

        console.log(response.body);

        let list = await request(settings.app)
            .get('/api/zombies')
            .expect('Content-Type', /json/)
            .expect(200);

        let length = list.body.length;

        const del = await request(settings.app)
            .delete('/api/zombies/del')
            .expect('Content-Type', /json/)
            .expect(200);

        list = await request(settings.app)
            .get('/api/zombies')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(list.body.length).toBe(length-1);
    });

    test('PUT: /:id should update a zombie', async (done) => {

    });
});
