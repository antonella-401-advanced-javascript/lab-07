const request = require('../request');
const db = require('../db');

describe('dogs api', () => {

  beforeEach(() => {
    return db.dropCollection('dogs');
  });

  const akk = {
    breed: 'Alaskan Klee Kai',
    nicknames: ['AKK', 'Klee Kai', 'Miniature Alaskan Husky', 'Mini Husky'],
    size: ['small', 'medium'],
    appearance: {
      pattern: 'bicolor',
      color: 'grey and white'
    },
    weight: 16,
    purebred: true
  };

  function postDog(dog) {
    return request
      .post('/api/dogs')
      .send(dog)
      .expect(200)
      .then(({ body }) => body);
  }

  it('post a dog', () => {
    return postDog(akk)
      .then(dog => {
        expect(dog).toEqual({
          _id: expect.any(String),
          __v: 0,
          ...akk
        });
      });
  });

  it('gets a dog by id', () => {
    return postDog(akk)
      .then(dog => {
        return request.get(`/api/dogs/${dog._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(dog);
          });
      });
  });

  it('gets a list of dogs', () => {
    return Promise.all([
      postDog({ breed: 'Alaskan Klee Kai', nicknames: ['AKK', 'Klee Kai', 'Miniature Alaskan Husky', 'Mini Husky'], size: ['small', 'medium'], appearance: { pattern: 'bicolor', color: 'grey and white' }, weight: 16, purebred: true }),
      postDog({ breed: 'Alaskan Klee Kai2', nicknames: ['AKK', 'Klee Kai', 'Miniature Alaskan Husky', 'Mini Husky'], size: ['small', 'medium'], appearance: { pattern: 'bicolor', color: 'grey and white' }, weight: 16, purebred: true }),
      postDog({ breed: 'Alaskan Klee Kai3', nicknames: ['AKK', 'Klee Kai', 'Miniature Alaskan Husky', 'Mini Husky'], size: ['small', 'medium'], appearance: { pattern: 'bicolor', color: 'grey and white' }, weight: 16, purebred: true }),
    ])
      .then(() => {
        return request
          .get('/api/dogs')
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
      });
  });

  it.skip('updates a dog', () => {
    return postDog(akk)
      .then(dog => {
        dog.weight = 10;
        return request
          .put(`/api/dogs/${dog._id}`)
          .send(dog)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.lives).toBe(10);
      });
  });

  it.skip('deletes a dog', () => {
    return postDog(akk)
      .then(dog => {
        return request
          .delete(`/api/dogs/${dog._id}`)
          .expect(200);
      });
  });

});