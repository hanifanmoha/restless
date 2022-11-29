module.exports = [
  {
    method: "GET",
    path: "/handlers",
    handler: "handler.getHandlers",
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/handlers",
    handler: "handler.createHandlers",
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: "PUT",
    path: "/handlers/:id",
    handler: "handler.updateHandlers",
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: "DELETE",
    path: "/handlers/:id",
    handler: "handler.deleteHandlers",
    config: {
      auth: false,
      policies: [],
    },
  },
];
