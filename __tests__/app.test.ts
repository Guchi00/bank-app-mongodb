import request from 'supertest';

import app from '../src/app';

describe("GET /", () => {
    test("it should return a 200 response", async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
});

