import { instance, instanceAuth } from './index';
import store from '@/store/index';
import { getThreedaysAgo, getToday } from '@/utils/getDays';

const getBrandInfo = apiKey => {
  return instance.get('/tenbyten/brandinfo', {
    headers: { Authorization: `bearer ${apiKey}` },
  });
};

const getOrders = () => {
  return instanceAuth.get('/tenbyten/orders', {
    params: {
      brandId: store.state.user.brandId,
      startdate: getThreedaysAgo(),
      enddate: getToday(),
    },
  });
};

const getOrderHistory = () => {
  return instanceAuth.get('/tenbyten/orders/orderhistory', {
    params: {
      brandId: store.state.user.brandId,
      startdate: getThreedaysAgo(),
      enddate: getToday(),
    },
  });
};

const dispatchOrder = (OrderSerial, DetailIdx) => {
  return instanceAuth.post('/tenbyten/orders/orderconfirm', {
    orderSerial: OrderSerial,
    detailIdx: DetailIdx,
    songjangDiv: '97', // 문자/이메일 발송 코드
    songjangNo: '0',
  });
};

const sendMail = mailData => {
  return instance.post('/mail', mailData);
};
export { getBrandInfo, getOrders, getOrderHistory, sendMail, dispatchOrder };
