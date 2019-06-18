import {
  ADD_CART,
  GET_CART_ALL,
  DELECR_CART
} from '../mutation-types';

import {
  reqAddCart,
  reqSelectAll,
  reqDetele
} from "../../api/cart";

export const addCart = async ({ commit }, data) => {
  let res = await reqAddCart(data);
  if (res.code === 200) {
    uni.showToast({
      mask:true,
      title:'已加入购物车'
    });
    commit(ADD_CART, { data });
    return true;
  }
};

export const getCartAll = async ({ commit }) => {
  let res = await reqSelectAll();
  if (res.code === 200) {
    commit(GET_CART_ALL, res.data)
  }
};

export const doDeleteCart = async ({ commit }, id) => {
  let res = await reqDetele(id);
};

