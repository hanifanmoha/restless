"use strict";

module.exports = ({ strapi }) => ({
  async get() {
    const handlers = await strapi.entityService.findMany(
      "plugin::restless.handler",
      {
        populate: {
          params: true,
        },
      }
    );
    return handlers;
  },
  async getById(id) {
    const handler = await strapi.entityService.findOne(
      "plugin::restless.handler",
      id,
      {
        populate: {
          params: true,
        },
      }
    );
    return handler;
  },
  async create(data) {
    const { params, ...handler } = data;
    const resParams = await Promise.all(
      params.map(({ id, ...param }) => {
        return strapi.entityService.create("plugin::restless.handlerparam", {
          data: param,
        });
      })
    );
    const res = await strapi.entityService.create("plugin::restless.handler", {
      data: { ...handler, params: resParams },
      populate: {
        params: true,
      },
    });
    return res;
  },
  async update(id, data) {
    const { params, ...handler } = data;

    const existingHandler = await this.getById(id);

    const existingIds = (existingHandler?.params || []).map(
      (param) => param.id
    );
    const newIds = (params || []).map((param) => param.id);
    const deletedIds = existingIds.filter(
      (existingId) => !newIds.find((newId) => newId === existingId)
    );

    const resParams = await Promise.all(
      params.map(({ id: paramId, ...param }) => {
        if (paramId > 0) {
          return strapi.entityService.update(
            "plugin::restless.handlerparam",
            paramId,
            {
              data: param,
            }
          );
        } else {
          return strapi.entityService.create("plugin::restless.handlerparam", {
            data: param,
          });
        }
      })
    );

    await Promise.all(
      deletedIds.map((deletedId) => {
        return strapi.entityService.delete(
          "plugin::restless.handlerparam",
          deletedId
        );
      })
    );

    const res = await strapi.entityService.update(
      "plugin::restless.handler",
      id,
      {
        data: { ...handler, params: resParams },
        populate: {
          params: true,
        },
      }
    );
    return res;
  },
  async delete(id) {
    const existingHandler = await this.getById(id);
    const existingIds = (existingHandler?.params || []).map(
      (param) => param.id
    );
    await Promise.all(
      existingIds.map((existingId) => {
        return strapi.entityService.delete(
          "plugin::restless.handlerparam",
          existingId
        );
      })
    );
    return await strapi.entityService.delete("plugin::restless.handler", id);
  },
});
