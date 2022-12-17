import { instance, instanceAuth } from './index';
import store from '@/store/index';
import { getThreedaysAgo, getToday } from '@/utils/getDays';

const getBrandInfo = apiKey => {
  return instance.get('/tenbyten/brandinfo', {
    headers: { Authorization: `bearer ${apiKey}` },
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

const sendMail = mailData => {
  return instance.post('/mail', mailData);
};
export {
  getBrandInfo,
  getNewOrders,
  getReadyOrders,
  getDispatchOrderHistory,
  sendMail,
  dispatchOrder,
};
