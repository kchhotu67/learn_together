import axios from "axios";

export const client = axios.create({
  headers:{
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
  withCredentials:true,
});

