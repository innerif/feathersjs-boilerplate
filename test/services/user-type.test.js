const assert = require('assert');
const app = require('../../src/app');

describe('\'userType\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-type');

    assert.ok(service, 'Registered the service');
  });
});
