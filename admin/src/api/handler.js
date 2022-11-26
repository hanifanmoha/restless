import { request } from "@strapi/helper-plugin";

const handerRequest = {
  getAllHandlers: async () => {
    return await request(`/restless/handlers`, {
      method: "GET",
    });
  },
  addHandler: async (data) => {
    return await request(`/restless/handlers`, {
      method: "POST",
      body: data,
    });
  },
  editHandler: async (id, data) => {
    return await request(`/restless/handlers/${id}`, {
      method: "PUT",
      body: data,
    });
  },
  deleteHandler: async (id, data) => {
    return await request(`/restless/handlers/${id}`, {
      method: "DELETE",
    });
  },
};

export default handerRequest;
