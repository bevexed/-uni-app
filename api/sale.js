import ajax from './ajax'

/**
 * @function 创建售后单
 * @param orderItemId
 * @param productCount
 * @param reason
 * @param reasonCode
 * @param type
 * @returns {Promise<*>}
 */

export const reqCreateAfterSale = ({ orderItemId, productCount, reason, reasonCode, type }) => ajax('/afterSale/createAfterSale', {
  orderItemId,
  productCount,
  reason,
  reasonCode,
  type
}, 'POST');

/**
 * @function 分页查看售后单
 * @param page
 * @param pageSize
 * @returns {Promise<*>}
 */

export const reqAfterSaleList = ({ page = 1, pageSize = 10 }) => ajax('/afterSale/afterSaleList', {
  page,
  pageSize
}, 'GET');
