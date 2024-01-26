import * as request from 'supertest';

import { test } from '../../test/util';
import {INestApplication} from "@nestjs/common";

describe('AppController', () => {

    let app:INestApplication;

    beforeAll(async () => {
        await test.prepareEnvironment();
        app = test.App;
    });

    it('GET / list all', async () => {
        const resp = await request(app.getHttpServer())
            .get('/')
            .send();

        expect(resp.status).toBe(200);
        expect(resp.body.items).toBeDefined();
        expect(resp.body.itemPerPage).toBeDefined();

    });

    it('POST / create fail', async () => {
        const resp = await request(app.getHttpServer())
        .post('/')
        .send({
          name: ''
        });

        expect(resp.status).toBe(400);
        expect(resp.body.error).toBeDefined();
        expect(resp.body.message).toBeDefined();
        expect(Array.isArray(resp.body.message)).toBe(true);
    });

    let createdId ;
    it('POST / create success', async () => {
        const resp = await request(app.getHttpServer())
            .post('/')
            .send({
                name: 'test',
                description: 'test-desc',
                price: 10
            });

        expect(resp.status).toBe(201);
        expect(resp.body._id).toBeDefined();
        expect(resp.body.status).toEqual('waiting');

        createdId = resp.body._id;
    });

    it('PATCH / toggle status', async () => {
        const resp = await request(app.getHttpServer())
            .patch(`/${createdId}`)
            .send();

        expect(resp.status).toBe(200);
        expect(resp.body._id).toBeDefined();
        expect(resp.body.status).toEqual('acquired');
    });

    it('DELETE / toggle delete', async () => {
        const resp = await request(app.getHttpServer())
            .delete(`/${createdId}`)
            .send();

        expect(resp.status).toBe(200);
    });

});
