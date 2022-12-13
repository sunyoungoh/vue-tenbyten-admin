import { instance } from './index';
import store from '@/store/index';
import { getThreedaysAgo, getToday } from '@/utils/getDays';

const headers = { Authorization: `bearer ${store.state.user.apiKey}` };
const params = {
  brandId: store.state.user.brandId,
  startdate: getThreedaysAgo(),
  enddate: getToday(),
};

const getBrandInfo = apiKey => {
  return instance.get('/tenbyten/brandinfo', {
    headers: { Authorization: `bearer ${apiKey}` },
  });
};

const getOrders = () => {
  return instance.get('/tenbyten/orders', { headers, params });
};

const getOrderHistory = () => {
  return instance.get('/tenbyten/orders/orderhistory', { headers, params });
};

const sendMail = mailData => {
  return instance.post('/mail', mailData);
};

const dispatchOrder = (OrderSerial, DetailIdx) => {
  return instance.post(
    '/tenbyten/orders/orderconfirm',
    {
      orderSerial: OrderSerial,
      detailIdx: DetailIdx,
      songjangDiv: '97', // 문자/이메일 발송 코드
      songjangNo: '0',
    },
    { headers },
  );
};

export { getBrandInfo, getOrders, getOrderHistory, sendMail, dispatchOrder };
