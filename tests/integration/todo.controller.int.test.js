const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/new-todo.json');

const endpointUrl = '/todos/';

let firstTodo, newTodoId;
const nonExistingTodoId = '5d5fff416bef3c07ecf11f77';
const testData = { title: 'Make integration test for PUT', done: true };

describe(endpointUrl, () => {
  test('GET ' + endpointUrl, async () => {
    const response = await request(app).get(endpointUrl);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
    firstTodo = response.body[0];
  });

  test('GET by Id ' + endpointUrl + ':todoId', async () => {
    const response = await request(app).get(endpointUrl + firstTodo._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(firstTodo.title);
    expect(response.body.done).toBe(firstTodo.done);
  });

  test('GET by Id doesnt exists ' + endpointUrl + ':todoId', async () => {
    const response = await request(app).get(
      endpointUrl + '5ff39e4cc83b183780965ddd'
    );
    expect(response.statusCode).toBe(404);
  });

  it('POST ' + endpointUrl, async () => {
    const response = await request(app).post(endpointUrl).send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
    newTodoId = response.body._id;
  });

  it(
    'should return error 500 on malformed data with POST' + endpointUrl,
    async () => {
      const response = await request(app).post(endpointUrl).send({
        title: 'Missing done property',
      });
      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message: 'Todo validation failed: done: Path `done` is required.',
      });
    }
  );

  test('PUT ' + endpointUrl + ':todoId', async () => {
    const response = await request(app)
      .put(endpointUrl + newTodoId)
      .send(testData);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(testData.title);
    expect(response.body.done).toBe(testData.done);
  });

  test('DELETE', async () => {
    const response = await request(app)
      .delete(endpointUrl + newTodoId)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(testData.title);
    expect(response.body.done).toBe(testData.done);
  });

  test('HTTP DELETE 404', async () => {
    const response = await request(app)
      .delete(endpointUrl + nonExistingTodoId)
      .send();
    expect(response.statusCode).toBe(404);
  });
});
