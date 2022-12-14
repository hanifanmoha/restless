"use strict";

module.exports = ({ strapi }) => ({
  async getHandlers(ctx) {
    try {
      ctx.body = await strapi.plugin("restrapi").service("handler").get();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async createHandlers(ctx) {
    try {
      ctx.body = await strapi
        .plugin("restrapi")
        .service("handler")
        .create(ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async updateHandlers(ctx) {
    try {
      ctx.body = await strapi
        .plugin("restrapi")
        .service("handler")
        .update(ctx.params.id, ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async deleteHandlers(ctx) {
    try {
      ctx.body = await strapi
        .plugin("restrapi")
        .service("handler")
        .delete(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
