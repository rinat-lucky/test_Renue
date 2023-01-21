import PropTypes from 'prop-types';

export const refundState = PropTypes.string.isRequired;

export const coinBalance = PropTypes.number.isRequired;

export const onChangeBalance = PropTypes.func.isRequired;

export const setRefundState = PropTypes.func.isRequired;

export const onBuy = PropTypes.func.isRequired;

export const shoppingList = PropTypes.arrayOf(PropTypes.string).isRequired;

export const extraProducts = PropTypes.arrayOf(PropTypes.array);

export const products = PropTypes.arrayOf(PropTypes.exact({
  name: PropTypes.string,
  productImageUrl: PropTypes.string,
  id: PropTypes.number, 
  price: PropTypes.number, 
  availableUnits: PropTypes.number,
})).isRequired;

export const coinsToRefund = PropTypes.arrayOf(PropTypes.exact({
  denomination: PropTypes.number,
  quantity: PropTypes.number,
})).isRequired;
