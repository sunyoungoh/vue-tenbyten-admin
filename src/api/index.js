import axios from 'axios';
import { setInterceptors } from '@/api/interceptors';

// 액시오스 초기화 함수
function createInstanceWithAuth() {
  axios.defaults.baseURL =
    process.env.NODE_ENV === 'development'
      ? '/'
      : process.env.VUE_APP_TENBYTEN_API_URL;
  const instance = axios.create({
    withCredentials: true,
  });
  return setInterceptors(instance);
}

export const instanceAuth = createInstanceWithAuth();
