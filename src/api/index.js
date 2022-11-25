import axios from 'axios';
import { setInterceptors } from '@/api/interceptors';

function createInstance() {
  return axios.create({
    withCredentials: true,
  });
}

function createInstanceWithAuth() {
  const instance = axios.create({
    withCredentials: true,
  });
  return setInterceptors(instance);
}

export const instance = createInstance();
export const instanceAuth = createInstanceWithAuth();
