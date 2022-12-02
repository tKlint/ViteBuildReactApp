import aboutApi from './about';
import loginApi from './login';
import userApi from './user';

const api = {
  ...loginApi,
  ...userApi,
  ...aboutApi,
};

export default api;
