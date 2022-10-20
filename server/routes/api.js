module.exports = [
  {
    method: "GET",
    path: "/api/public/:path",
    handler: "api.execute",
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/api/public/:path",
    handler: "api.execute",
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: "PUT",
    path: "/api/public/:path",
    handler: "api.execute",
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: "PATCH",
    path: "/api/public/:path",
    handler: "api.execute",
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: "DELETE",
    path: "/api/public/:path",
    handler: "api.execute",
    config: {
      auth: false,
      policies: [],
    },
  },
];
