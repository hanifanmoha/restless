"use strict";

module.exports = ({ strapi }) => ({
  async get() {
    return await strapi.entityService.findMany("plugin::restless.handler");
  },
  async create(data) {
    return await strapi.entityService.create("plugin::restless.handler", {
      data,
    });
  },
  async update(id, data) {
    return await strapi.entityService.update("plugin::restless.handler", id, {
      data,
    });
  },
  async delete(id) {
    return await strapi.entityService.delete("plugin::restless.handler", id);
  },
});
