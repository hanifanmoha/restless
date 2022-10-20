module.exports = [
  {
    method: "GET",
    path: "/handlers",
    handler: "handler.getHandlers",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/handlers",
    handler: "handler.createHandlers",
    config: {
      policies: [],
    },
  },
  {
    method: "PUT",
    path: "/handlers/:id",
    handler: "handler.updateHandlers",
    config: {
      policies: [],
    },
  },
  {
    method: "DELETE",
    path: "/handlers/:id",
    handler: "handler.deleteHandlers",
    config: {
      policies: [],
    },
  },
];
