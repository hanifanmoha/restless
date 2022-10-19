"use strict";

module.exports = ({ strapi }) => ({
  async get() {
    return await strapi.entityService.findMany("plugin::bloon.handler");
  },
  async create(data) {
    return await strapi.entityService.create("plugin::bloon.handler", { data });
  },
  async update(id, data) {
    return await strapi.entityService.update("plugin::bloon.handler", id, {
      data,
    });
  },
  async delete(id) {
    return await strapi.entityService.delete("plugin::bloon.handler", id);
  },
});
