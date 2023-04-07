import axios from "axios";
import config from "../config";
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiamhvbmNiZXJuYWxAZ21haWwuY29tIiwiaWQiOiI1ZTc2NDJlNWYyZGI0MGI0OTRhYjA5ODAifSwiaWF0IjoxNjQ3MDY0NjUzLCJleHAiOjE2NDk2NTY2NTN9.0rM8XYDa7Li77yJFuJBtKGQgI9yx2oWg9r1XIvfi9zw";
const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYm9yZWFsbWFkcmlkcGhAZ21haWwuY29tIiwiaWQiOiI1ZTc2YTU2MjdmZTkxYWQ1NWYyMGE1OWEifSwiaWF0IjoxNjQ3MTMyNjkxLCJleHAiOjE2NDk3MjQ2OTF9.B1cC9hJNd-KZk6fQEJR9X5hnTsAdqTlzNVhHYHfd_BY";
const ownerToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiamhvbmNiZXJuYWxAZ21haWwuY29tIiwiaWQiOiI1ZTc2NDJlNWYyZGI0MGI0OTRhYjA5ODAifSwiaWF0IjoxNjQ3MTk5ODEzLCJleHAiOjE2NDk3OTE4MTN9.6DPDM3IxhF8wp4OPit53cESkBxALReDAklXmFyn-cDk";
const providerToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiY2FybmVzZWxwb3J0YWxAaG90bWFpbC5jb20iLCJpZCI6IjVlOTM4YzY5ZTFjM2Q2ZWY0ODBmYTIwOSJ9LCJpYXQiOjE2NDcyMjg1NTIsImV4cCI6MTY0OTgyMDU1Mn0.cKUdOq_k5OhW7bGK8AhkK4yx6wDvOFyqVQpDDlCwK3w";
const api = axios.create({
  baseURL: `${config.BASE_URL}${config.API_VERSION}`,
});
api.interceptors.request.use(
  async function (config: any) {
    if (config.headers.Authorization === true)
      config.headers.Authorization = `${providerToken}`;
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  },
);
export { api, config as paths };
