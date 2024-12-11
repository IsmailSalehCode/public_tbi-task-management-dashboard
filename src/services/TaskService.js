import Api from "./Api";

const rootResource = "/tasks";

export default {
  getAll() {
    return Api().get(`${rootResource}`);
  },

  add(entity) {
    return Api().post(`${rootResource}`, entity);
  },

  edit(updEntity) {
    return Api().put(`${rootResource}/${updEntity.id}`, updEntity);
  },

  //Not required in specs:
  //   delete(entityId) {
  //     return Api().delete(`${rootResource}/${entityId}`);
  //   },
};
