import { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Col, Row } from "react-bootstrap";
import RefundButton from "../refundButton/RefundButton";

const ControlPanel = (props) => {
  const { coinBalance, onChangeBalance, coinsToPay, shoppingList } = props;
  const [total, setTotal] = useState(coinBalance);

  useEffect(() => {
    setTotal(coinBalance);
  }, [coinBalance]);

  const makeShopList = (list) => {
    const formedList = list.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {});
    
    const sortedList = Object.entries(formedList);
    sortedList.sort((a, b) => b[1] - a[1]);
    return sortedList;
  };

  const buttons = coinsToPay.map((item, i) => (
    <Col key={i}>
      <Button
        onClick={() => onChangeBalance(total + item)}
        style={{'width': '100%'}}
      >
        {item}
      </Button>
    </Col>
  ));

  const renderShopList = () => {
    if (shoppingList.length < 1) return '';
    const shopList = makeShopList(shoppingList);

    return (
      <Card>
        <Card.Header className='text-center'>Список покупок</Card.Header>
        <ListGroup variant="flush" as="ol" numbered>
          {shopList.map((item) => {
            return (
              <ListGroup.Item key={item[0]} className="d-flex justify-content-between align-items-center" as="li">
                <div className='ms-2 me-auto'>{item[0]}</div>  
                <Badge>{item[1]}</Badge>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card>
    );
  };

  const renderRefund = () => {
    return (
      <Card>
        <Card.Header className='text-center'>Сдача: {'500 рублей'}</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <div>{'100'} рублей</div>  
            <Badge>{'5'}</Badge>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  };

  return (  
    <div className="container">
      <div className="row">
        <div className="col-10 d-flex flex-column">
          <Card className="mb-4">
            <Card.Header className='text-center'>Внесите деньги</Card.Header>
            <Card.Body>
              <Row xs={1} md={4} className="g-1">
                {buttons}
              </Row>
            </Card.Body>
          </Card>
          <Alert
            variant="success"
            className="d-flex flex-row justify-content-between align-items-center mb-4 text-left"
          >
            <div>Доступная сумма: <span className="fw-bold">{total}</span> руб.</div>
            <RefundButton toRefund={total} />
          </Alert>

          <Row xs={1} md={2} className="g-3">
            <Col>
              {renderShopList()}
            </Col>  
            <Col>  
              {renderRefund()}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
