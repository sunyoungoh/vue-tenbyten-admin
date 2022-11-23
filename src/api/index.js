import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
});

function getOrders(apiKey, brandId) {
  return instance.get('/v2/orders', {
    headers: {
      Authorization: `bearer ${apiKey}`,
    },
    params: {
      brandId: brandId,
      startdate: getThreedaysAgo(),
      enddate: getToday(),
    },
  });
}
function getOrderHistory(apiKey, brandId) {
  return instance.get('/v2/orders/orderhistory', {
    headers: {
      Authorization: `bearer ${apiKey}`,
    },
    params: {
      brandId: brandId,
      startdate: getThreedaysAgo(),
      enddate: getToday(),
    },
  });
}
function postOrder(apiKey, OrderSerial, DetailIdx) {
  return instance.post(
    '/v2/orders/orderconfirm',
    {
      orderSerial: OrderSerial,
      detailIdx: DetailIdx,
      songjangDiv: '97',
      songjangNo: '0',
    },
    {
      headers: {
        Authorization: `bearer ${apiKey}`,
      },
    },
  );
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
