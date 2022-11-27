"use strict";

module.exports = ({ strapi }) => ({
  async get() {
    const handlers = await strapi.entityService.findMany(
      "plugin::restless.handler"
    );
    // const handlerParams = await strapi.entityService.findMany(
    //   "plugin::restless.handlerparam"
    // );
    // console.log(handlerParams);
    // for (const handler of handlers) {
    //   handler.params = handlerParams.filter(
    //     (param) => param.handler === handler.id
    //   );
    // }
    return handlers;
  },
  async create(data) {
    const { params, ...handler } = data;
    const res = await strapi.entityService.create("plugin::restless.handler", {
      data: handler,
    });
    res.params = [];
    // for (const param of params) {
    //   const { id, ...paramData } = param;
    //   const resParam = await strapi.entityService.create(
    //     "plugin::restless.handlerparam",
    //     {
    //       data: { ...paramData, handler: res.id },
    //     }
    //   );
    //   res.params.push(resParam);
    // }
    return res;
  },
  async update(id, data) {
    const { params, ...handler } = data;
    const res = await strapi.entityService.update(
      "plugin::restless.handler",
      id,
      {
        data: handler,
      }
    );
    res.params = [];
    // const existingParams = await strapi.entityService.findMany(
    //   "plugin::restless.handlerparam",
    //   {
    //     filters: {
    //       handler: id,
    //     },
    //   }
    // );
    // console.log(existingParams);
    // for (const param of params) {
    //   const { id: paramId, ...paramData } = param;
    //   if (id >= 0) {
    //     const resParam = await strapi.entityService.create(
    //       "plugin::restless.handlerparam",
    //       {
    //         data: { ...paramData, handler: res.id },
    //       }
    //     );
    //     res.params.push(resParam);
    //   } else {
    //     const resParam = await strapi.entityService.update(
    //       "plugin::restless.handlerparam",
    //       paramId,
    //       {
    //         data: { ...paramData, handler: res.id },
    //       }
    //     );
    //     res.params.push(resParam);
    //   }
    // }
    return res;
  },
  async delete(id) {
    return await strapi.entityService.delete("plugin::restless.handler", id);
  },
});
