"use strict";

const { PARAM_TYPES } = require("../etc/constants");

function replaceAll(string, search, replace = "") {
  return string.split(search).join(replace);
}

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

    const payload = { ...query, ...body };

    const handler = handlers[0];

    let script = handler.script;
    for (let param of handler.params || []) {
      let value = payload[param.name];

      if (value === undefined && param.required) {
        throw `${param.name} is required`;
      }

      script = replaceAll(script, `::${param.name}::`, value);
    }

    console.log(`Execute Script : ${script}`);

    try {
      return await strapi.db.connection.context.raw(script);
    } catch (err) {
      throw err.toString();
    }
  },
});
