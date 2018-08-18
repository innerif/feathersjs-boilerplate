const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const errors = require('@feathersjs/errors');

module.exports = function () {
  const app = this;
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local(config.local));

  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    },
    after: {
      create: [
        hook => {
          let user = hook.params.user;

          if(!user.status) {
            throw new errors.NotAuthenticated('User not active.', {errors: {status: 'User not active'}});
          }

          hook.result.user = user;
          delete hook.result.user.password;

          hook.app.service('users').patch(user.id, {lastLoginAt: Sequelize.literal('CURRENT_TIMESTAMP')});
        }
      ],
      remove: [
        hook => {

        }
      ]
    }
  });
};
