import { instance, instanceAuth } from './index';
import store from '@/store/index';
import { getToday, getThreedaysAgo, getSixdaysAgo } from '@/utils/getDays';

const getBrandInfo = apiKey => {
  return instance.get('/tenbyten/brandinfo', {
    headers: { Authorization: apiKey },
  });
};

const getNewOrders = () => {
  return instanceAuth.get('/tenbyten/orders', {
    params: {
      brandId: store.state.user.brandId,
      startdate: getThreedaysAgo(),
      enddate: getToday(),
    },
  });
};

const getReadyOrders = () => {
  return instanceAuth.get('/tenbyten/orders/ready', {
    params: {
      brandId: store.state.user.brandId,
      startdate: getThreedaysAgo(),
      enddate: getToday(),
    },
  });
};

const getDispatchOrderHistory = () => {
  return instanceAuth.get('/tenbyten/orders/orderconfirm');
};

const dispatchOrder = dispatchData => {
  return instanceAuth.post('/tenbyten/orders/orderconfirm', dispatchData);
};

// 일주일 이내로만 검색 가능
const getQna = () => {
  return instanceAuth.get('/tenbyten/qna', {
    params: {
      brandId: store.state.user.brandId,
      startdate: getSixdaysAgo(),
      enddate: getToday(),
    },
  });
};
const anwserQna = anwserData => {
  return instanceAuth.post('/tenbyten/qna', anwserData);
};

const sendMail = mailData => {
  return instance.post('/mail', mailData);
};

export {
  getBrandInfo,
  getNewOrders,
  getReadyOrders,
  getDispatchOrderHistory,
  getQna,
  anwserQna,
  sendMail,
  dispatchOrder,
};
