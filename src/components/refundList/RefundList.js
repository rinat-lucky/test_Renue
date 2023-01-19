import { useEffect, useMemo } from "react";
import PropTypes from 'prop-types';
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const RefundList = (props) => {
  const {
		sumToRefund,
		setRefundState,
		coinsToRefund,
		products,
	} = props;

  useEffect(() => {
    setRefundState('completed');
  }, [setRefundState]);

  const totalCoinsList = useMemo(() => {
    let coinsList = [];

    coinsToRefund.forEach((coin) => {
      const equalCoinsList = Array(coin.quantity).fill(coin.denomination);
      coinsList = [...coinsList, ...equalCoinsList];
    });

    coinsList.sort((a, b) => b - a);
    return coinsList;
  }, [coinsToRefund]);

  const refundList = useMemo(() => {
    let sum = sumToRefund;
    let refundCoinsList = [];

    for (let coin of totalCoinsList) {
      if (coin > sum) continue;
      refundCoinsList = [...refundCoinsList, coin];
      sum = sum - coin;
    }

    const formedRefundList = refundCoinsList.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});

    const sortedRefundList = Object.entries(formedRefundList);
    sortedRefundList.sort((a, b) => b[0] - a[0]);

    return {
			refund: sortedRefundList,
			remainder: sum,
		};
  }, [sumToRefund, totalCoinsList]);

  const availableProductsList = useMemo(() => {
    let productsList = [];

    products.forEach((product) => {
      const equalProductsList = Array(product.availableUnits).fill({name: product.name, price: product.price});
      productsList = [...productsList, ...equalProductsList];
    });

    productsList.sort((a, b) => b['price'] - a['price']);
    return productsList;
  }, [products]);

  const additionalProducts = useMemo(() => {
    if (!refundList.remainder) return;
    let sum = refundList.remainder;
    let additionalProductsList = [];

    for (let product of availableProductsList) {
      if (product.price > sum) continue;
      additionalProductsList = [...additionalProductsList, product.name];
      sum = sum - product.price;
    }

    const formedAdditionalProductsList = additionalProductsList.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});

    const sortedAdditionalProductsList = Object.entries(formedAdditionalProductsList);
    sortedAdditionalProductsList.sort((a, b) => b[1] - a[1]);

    return {
			products: sortedAdditionalProductsList,
			remainder: sum,
		};

  }, [refundList.remainder, availableProductsList]);

  const renderRefundList = () => {
		return refundList.refund.map((coin) => {
      return (
        <ListGroup.Item key={coin[0]} className="d-flex justify-content-between align-items-center">
          <div>{coin[0]} &#8381;</div>  
          <Badge>{coin[1]}</Badge>
        </ListGroup.Item>
      );
    });
  };

  const renderAdditionalProducts = () => {
    if (!additionalProducts) return;

    return (
      <div className="mt-1">
        {additionalProducts.products.map((product) => {
          return (
            <div key={product[0]} className="d-flex justify-content-between align-items-center">
              <div>{product[0]}</div>  
              <Badge>{product[1]}</Badge>
            </div>
          );
        })}
      </div>
    );
  };

	const renderRemainder = () => {
		if (!additionalProducts) return;

		return (
			<Card.Footer className="d-flex justify-content-between">
        <div>Остаток:</div> 
        <div>{additionalProducts.remainder} &#8381;</div>
			</Card.Footer>
		);
	};

  return (
    <Card>
			<Card.Header className="d-flex justify-content-between">
        <div>Сдача (всего):</div> 
        <div>{sumToRefund} &#8381;</div>
      </Card.Header>
      <ListGroup variant="flush">
        {renderRefundList()}
      </ListGroup>
			<Card.Footer className="text-end">
				<div className="d-flex justify-content-between">
          <div>Выдано:</div> 
          <div>{sumToRefund - refundList.remainder} &#8381;</div>
        </div>
        {renderAdditionalProducts()}
			</Card.Footer>
			{renderRemainder()}
    </Card>
  );
};

RefundList.propTypes = {
  sumToRefund: PropTypes.number.isRequired,
  setRefundState: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.exact({
    name: PropTypes.string,
		productImageUrl: PropTypes.string,
		id: PropTypes.number, 
		price: PropTypes.number, 
		availableUnits: PropTypes.number,
  })).isRequired,
  coinsToRefund: PropTypes.arrayOf(PropTypes.exact({
    denomination: PropTypes.number,
    quantity: PropTypes.number,
  })).isRequired,
}

export default RefundList;
