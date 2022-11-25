import { instance, instanceAuth } from './index';
import store from '@/store/index';

const getOrders = () => {
  return instanceAuth.get('/api/v2/orders', {
    params: {
      brandId: store.state.brandId,
      startdate: getThreedaysAgo(),
      enddate: getToday(),
    },
  });
};

const getOrderHistory = () => {
  return instanceAuth.get('/api/v2/orders/orderhistory', {
    params: {
      brandId: store.state.brandId,
      startdate: getThreedaysAgo(),
      enddate: getToday(),
    },
  });
};

const sendMail = (itemId, itemOptionName, toEmail) => {
  return instance.get(`/mail/send/${itemId}/${itemOptionName}/${toEmail}`);
};

const postOrder = (OrderSerial, DetailIdx) => {
  return instanceAuth.post('/v2/orders/orderconfirm', {
    orderSerial: OrderSerial,
    detailIdx: DetailIdx,
    songjangDiv: '97', // 문자/이메일 발송 코드
    songjangNo: '0',
  });
};

const getThreedaysAgo = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = ('0' + (1 + date.getMonth())).slice(-2);
  let day = ('0' + date.getDate()).slice(-2) - 3;

  return year + '-' + month + '-' + day;
};
const getToday = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = ('0' + (1 + date.getMonth())).slice(-2);
  let day = ('0' + date.getDate()).slice(-2);

  return year + '-' + month + '-' + day;
};

export { getOrders, getOrderHistory, sendMail, postOrder };
