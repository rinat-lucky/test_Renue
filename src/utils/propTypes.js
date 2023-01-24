import PropTypes from 'prop-types';

export const onBuy = PropTypes.func.isRequired;
export const shopList = PropTypes.arrayOf(PropTypes.string).isRequired;
export const extraProducts = PropTypes.arrayOf(PropTypes.array);
