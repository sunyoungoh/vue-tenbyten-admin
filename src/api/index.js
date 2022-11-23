import axios from 'axios';
import { setInterceptors } from '@/api/interceptors';

// 액시오스 초기화 함수
function createInstanceWithAuth() {
  const instance = axios.create({
    withCredentials: true,
  });
  return setInterceptors(instance);
}

export const instanceAuth = createInstanceWithAuth();
