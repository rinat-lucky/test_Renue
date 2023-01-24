import { useSelector, useDispatch } from 'react-redux';

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";

import { setBalance } from "../slices/balanceSlice";

const coinsToPay = [50, 100, 500, 1000];

const PaymentsBlock = () => {
  const refundState = useSelector((state) => state.refund.status);
  const coinBalance = useSelector((state) => state.balance.value);
  const dispatch = useDispatch();

  return (
    <Card.Body>
      <Row xs={1} md={4} className="g-1">
        {coinsToPay.map((item, i) => (
          <Col key={i}>
            <Button
              onClick={() => dispatch(setBalance(coinBalance + item))}
              style={{"width": "100%"}}
              disabled={refundState === "completed"}
            >
              {item}
            </Button>
          </Col>
        ))}
      </Row>
    </Card.Body>
  );
};

export default PaymentsBlock;
