import axios from 'axios';

const API = axios.create({
  baseURL: 'https://strapi.cleverland.by/api/',
});

API.interceptors.request.use(
  (request) => {
    const tokenLocalStorage = localStorage.getItem('token');

    if (tokenLocalStorage && request.headers) {
      request.headers.Authorization = `Bearer ${tokenLocalStorage}`;
    }

    return request;
  },
  (error) => Promise.reject(error)
);

const httpService = {
  get: API.get,
  post: API.post,
  put: API.put,
  delete: API.delete,
};

export { httpService };
