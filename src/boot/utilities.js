import { boot } from "quasar/wrappers";

const utils = {
  permisos: '',
  username: '',
  authenticated: false,
  api_backend: "http://localhost:8004/api/",
  token: ''
};

export default boot(({ app }) => {
  app.config.globalProperties.$utils = utils;
});
