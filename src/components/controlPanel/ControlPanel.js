import {useState, useEffect} from "react";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col, Row } from "react-bootstrap";
import { coinsToInsert as coins } from "../../data";
import RefundButton from "../refundButton/RefundButton";

const ControlPanel = ({ coinBalance, onCoinChanged }) => {
  const [total, setTotal] = useState(coinBalance);

  useEffect(() => {
    setTotal(coinBalance);
  }, [coinBalance]);

  const onItemClick = (value) => {
    const newTotal = total + value;
    setTotal(newTotal);
    onCoinChanged(newTotal);
  };

  const onReset = () => {
    setTotal(0);
    onCoinChanged(0);
  };

  const buttons = coins.map((item, i) => (
    <Col key={i}>
      <Button
        onClick={() => onItemClick(item)}
        style={{'width': '100%'}}
      >
        {item}
      </Button>
    </Col>
  ));

  return (  
    <div className="container">
      <div className="row">
        <div className="col-10 d-flex flex-column">
          <Card className="mb-5">
            <Card.Header className='text-center'>Внесите деньги</Card.Header>
            <Card.Body>
              <Row xs={1} md={2} className="g-4">
                {buttons}
              </Row>
            </Card.Body>
          </Card>
          
          <Alert variant="success" className="mb-3 text-center">Доступная сумма: {total} руб.</Alert>
          <RefundButton toRefund={total}/>
          <Button onClick={onReset} variant="danger" className='mt-5'>Сброс</Button>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
