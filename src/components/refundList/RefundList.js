import { useEffect, useMemo } from "react";

import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { reduce } from "../utils";
import { coinBalance, setRefundState, coinsToRefund, products } from "../propTypes";

const RefundList = (props) => {
  const { coinBalance, setRefundState, coinsToRefund, products } = props;

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
    let sum = coinBalance;
    let refundCoinsList = [];

    for (let coin of totalCoinsList) {
      if (coin > sum) continue;
      refundCoinsList = [...refundCoinsList, coin];
      sum -= coin;
    }

    const formedRefundList = reduce(refundCoinsList);
    const sortedRefundList = Object.entries(formedRefundList);
    sortedRefundList.sort((a, b) => b[0] - a[0]);

    return {
			refund: sortedRefundList,
			remainder: sum,
		};
  }, [coinBalance, totalCoinsList]);

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
      sum -= product.price;
    }

    const formedAdditionalProductsList = reduce(additionalProductsList);
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
        <div>{coinBalance} &#8381;</div>
      </Card.Header>
      <ListGroup variant="flush">{renderRefundList()}</ListGroup>
			<Card.Footer className="text-end">
				<div className="d-flex justify-content-between">
          <div>Выдано:</div> 
          <div>{coinBalance - refundList.remainder} &#8381;</div>
        </div>
        {renderAdditionalProducts()}
			</Card.Footer>
			{renderRemainder()}
    </Card>
  );
};

RefundList.propTypes = {products, coinBalance, coinsToRefund, setRefundState};

export default RefundList;
