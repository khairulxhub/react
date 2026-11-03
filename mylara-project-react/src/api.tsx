import axios from "axios";

export const baseUrl="http://mylara-api.test/";
export const baseUrlApi="http://mylara-api.test/api/";


export  const api =axios.create({ 
    baseURL:baseUrlApi,
    headers:{
        "Content-Type":"application/json",
    },
});

api.interceptors.request.use(function (config) {
    // const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  });