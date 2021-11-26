const getData = (state) => state.orders || {};

export const getOrders = (state) => getData(state).orders || {};
