import { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Col, Row } from "react-bootstrap";
import VendingAPI from "../../api/VendingAPI";
import RefundList from "../refundList/RefundList";

const ControlPanel = (props) => {
  const {
		coinBalance,
		onChangeBalance,
		shoppingList,
		refundState,
		setRefundState,
		products,
	} = props;
  const [coinsToRefund, setCoinsToRefund] = useState([]);

  const coinsToPay = [50, 100, 500, 1000];

  const buttons = coinsToPay.map((item, i) => (
    <Col key={i}>
      <Button
        onClick={() => onChangeBalance(coinBalance + item)}
        style={{"width": "100%"}}
        disabled={refundState === "completed"}
      >
        {item}
      </Button>
    </Col>
  ));

  const api = useMemo(() => {
    return new VendingAPI();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setCoinsToRefund(await api.getCoinsToRefund());
    } 
    fetchData();
  }, [api]);

  const makeShopList = (list) => {
    const formedList = list.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {});
    
    const sortedList = Object.entries(formedList);
    sortedList.sort((a, b) => b[1] - a[1]);
    return sortedList;
  };

  const renderAlert = () => {
    if (refundState === "completed") {
      return (
        <div className="mx-auto">Спасибо за покупку &#128578;</div>
      );
    }
    return (
      <>
        <div>Доступная сумма: <span className="fw-bold">{coinBalance}</span> руб.</div>
        <Button
          onClick={() => setRefundState("requested")}
          disabled={!coinBalance}
        >
          Получить сдачу
        </Button>
      </>
    );
  };

  const renderShopList = () => {
    if (shoppingList.length < 1) return;
    const shopList = makeShopList(shoppingList);

    return (
      <Card>
        <Card.Header className="text-center">Список покупок</Card.Header>
        <ListGroup variant="flush" as="ol" numbered>
          {shopList.map((item) => {
            return (
              <ListGroup.Item key={item[0]} className="d-flex justify-content-between align-items-center" as="li">
                <div className="ms-2 me-auto">{item[0]}</div>  
                <Badge>{item[1]}</Badge>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card>
    );
  };

  const renderRefundList = () => {
    if (!refundState) return;
    
    return (
      <RefundList
        products={products}
				sumToRefund={coinBalance}
				coinsToRefund={coinsToRefund}
        setRefundState={setRefundState}
      />
    );
  };

  return (  
    <div className="container">
      <div className="row">
        <div className="col-10 d-flex flex-column">
          <Card className="mb-3">
            <Card.Header className="text-center">Внесите деньги</Card.Header>
            <Card.Body>
              <Row xs={1} md={4} className="g-1">
                {buttons}
              </Row>
            </Card.Body>
          </Card>
          <Alert
            variant="success"
            className="d-flex flex-row justify-content-between align-items-center mb-3"
          >
            {renderAlert()}
          </Alert>

          <Row xs={1} md={2} className="g-3">
            <Col>{renderShopList()}</Col>  
            <Col>{renderRefundList()}</Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

ControlPanel.propTypes = {
  refundState: PropTypes.string.isRequired,
  coinBalance: PropTypes.number.isRequired,
  setRefundState: PropTypes.func.isRequired,
  onChangeBalance: PropTypes.func.isRequired,
  shoppingList: PropTypes.arrayOf(PropTypes.string).isRequired,
  products: PropTypes.arrayOf(PropTypes.exact({
    name: PropTypes.string,
		productImageUrl: PropTypes.string,
		id: PropTypes.number, 
		price: PropTypes.number, 
		availableUnits: PropTypes.number,
  })).isRequired,
}

export default ControlPanel;
