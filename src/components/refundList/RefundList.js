import { useEffect, useMemo } from "react";

import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import ExtraProductsList from "../extraProductsList/ExtraProductsList";
import { makeSortedList } from "../utils";
import {
  coinBalance,
  setRefundState,
  coinsToRefund,
  products,
} from "../propTypes";

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

    return {
      refund: makeSortedList(refundCoinsList, 0),
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

  const extraProducts = useMemo(() => {
    if (!refundList.remainder) return;
    let sum = refundList.remainder;
    let extraProductsList = [];

    for (let product of availableProductsList) {
      if (product.price > sum) continue;
      extraProductsList = [...extraProductsList, product.name];
      sum -= product.price;
    }

    return {
      products: makeSortedList(extraProductsList, 1),
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

	const renderRemainder = () => {
		if (!extraProducts || extraProducts.remainder === 0) return;

		return (
			<Card.Footer className="d-flex justify-content-between">
        <div>Остаток:</div> 
        <div>{extraProducts.remainder} &#8381;</div>
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
        {extraProducts && (<ExtraProductsList extraProducts={extraProducts.products}/>)}
			</Card.Footer>
			{renderRemainder()}
    </Card>
  );
};

RefundList.propTypes = {
  products,
  coinBalance,
  coinsToRefund,
  setRefundState,
};

export default RefundList;
