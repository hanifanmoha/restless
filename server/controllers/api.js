"use strict";

module.exports = ({ strapi }) => ({
  async execute(ctx) {
    try {
      ctx.body = await strapi
        .plugin("restless")
        .service("api")
        .execute(ctx.request.method, ctx.params, ctx.query, ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
