"use strict";

module.exports = ({ strapi }) => ({
  async execute(method, params, query, body) {
    const handlers = await strapi.entityService.findMany(
      "plugin::restless.handler",
      {
        filters: {
          path: params.path,
          method,
        },
        populate: { params: true },
      }
    );

    if (handlers.length !== 1) {
      throw "Handler not found";
    }

    const handler = handlers[0];
    console.log(handler);

    return await strapi.db.connection.context.raw(handler.script);
  },
});
