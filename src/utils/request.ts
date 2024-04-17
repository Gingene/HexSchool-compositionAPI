// axios 封裝
import axios from 'axios';

const { VITE_APP_SERVICE_API } = import.meta.env;

const http = axios.create({
  baseURL: VITE_APP_SERVICE_API,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

http.interceptors.request.use(
  (config) => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*)|^.*$/, '$1');
    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const endpoint = {
  users: {
    _: 'users',
    signup: 'users/sign_up',
    signin: 'users/sign_in',
    checkout: 'users/checkout',
    signout: 'users/sign_out'
  },
  todos: 'todos'
};

export { http, endpoint };
