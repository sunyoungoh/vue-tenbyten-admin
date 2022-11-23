import { instanceAuth } from './index';

function getOrders(brandId) {
  return instanceAuth.get('/v2/orders', {
    params: {
      brandId: brandId,
      startdate: getThreedaysAgo(),
      enddate: getToday(),
    },
  });
}
function getOrderHistory(brandId) {
  return instanceAuth.get('/v2/orders/orderhistory', {
    params: {
      brandId: brandId,
      startdate: getThreedaysAgo(),
      enddate: getToday(),
    },
  });
}
function postOrder(OrderSerial, DetailIdx) {
  return instanceAuth.post('/v2/orders/orderconfirm', {
    orderSerial: OrderSerial,
    detailIdx: DetailIdx,
    songjangDiv: '97',
    songjangNo: '0',
  });
}

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

export { getOrders, getOrderHistory, postOrder };
