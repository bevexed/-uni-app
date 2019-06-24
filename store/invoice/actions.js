import {
  ADD_INVOICE, GET_INVOICE_DETAIL,
  GET_INVOICE_LIST
} from '../mutation-types';

import {
  changInvoiceDetail,
  reqAddInvoice, reqInvoiceDetail, reqInvoiceList
} from "../../api/invoice";

import { MSG_TO, SMG } from "../../static/unit";

export const addInvoice = async ({ dispatch }, data) => {
  const { account, address, bank, city, companyName, companyTax, county, isDefault, phone, province, type, userId } = data;

  if (type === '普票') {
    if (!companyName) {
      SMG('请输入企业名称');
      return
    }
    if (!companyTax) {
      SMG('请输入税号');
      return
    }
    data = { companyName, companyTax, type, userId, isDefault }
  } else if (type === '专票') {
    if (!account) {
      SMG('请输入开户账号');
      return
    }

    if (!address) {
      SMG('请填写详细地址');
      return
    }

    if (!bank) {
      SMG('请选择开户银行');
      return
    }

    let p = /^1\d{10}$/;
    if (!p.test(phone)) {
      SMG('请检测手机号');
      return
    }

    if (!companyName) {
      SMG('请输入企业名称');
      return
    }
    if (!companyTax) {
      SMG('请输入税号');
      return
    }
  }

  let res = await reqAddInvoice(data);
  if (res.code === 200) {
    MSG_TO({
      title: '添加成功',
      url: '/pages/ticket/ticket'
    })
  }
};

export const getInvoiceList = async ({ commit }) => {
  let res = await reqInvoiceList();
  if (res.code === 200) {
    commit(GET_INVOICE_LIST, res)
  }
};

export const getInvoiceDetail = async ({ commit }, id) => {
  let res = await reqInvoiceDetail(id);
  if (res.code === 200) {
    commit(GET_INVOICE_DETAIL, res)
  }
};

export const invoiceDetail = async ({ dispatch }, id) => {
  let res = await changInvoiceDetail(id);
  if (res.code === 200) {
    await dispatch('getInvoiceList');
    uni.showToast({
      title: '修改成功'
    })
  }
};
