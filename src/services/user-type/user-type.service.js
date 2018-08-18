// Initializes the `userType` service on path `/user-type`
const createService = require('feathers-sequelize');
const createModel = require('../../models/user-type.model');
const hooks = require('./user-type.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/user-type', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-type');

  service.hooks(hooks);
};
