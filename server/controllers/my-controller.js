'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('bloon')
      .service('myService')
      .getWelcomeMessage();
  },
});
