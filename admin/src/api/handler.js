import { request } from "@strapi/helper-plugin";

const handerRequest = {
  getAllHandlers: async () => {
    return await request(`/bloon/handlers`, {
      method: "GET",
    });
  },
  addHandler: async (data) => {
    return await request(`/bloon/handlers`, {
      method: "POST",
      body: data,
    });
  },
  editHandler: async (id, data) => {
    return await request(`/bloon/handlers/${id}`, {
      method: "PUT",
      body: data,
    });
  },
  deleteHandler: async (id, data) => {
    return await request(`/bloon/handlers/${id}`, {
      method: "DELETE",
    });
  },
};

export default handerRequest;
