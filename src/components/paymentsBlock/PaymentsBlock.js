import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";

import {
  coinBalance,
  refundState,
  onChangeBalance,
} from "../propTypes";

const coinsToPay = [50, 100, 500, 1000];

const PaymentsBlock = ({ coinBalance, onChangeBalance, refundState }) => {
  return (
    <Card.Body>
      <Row xs={1} md={4} className="g-1">
        {coinsToPay.map((item, i) => (
          <Col key={i}>
            <Button
              onClick={() => onChangeBalance(coinBalance + item)}
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

PaymentsBlock.propTypes = {
  coinBalance,
  refundState,
  onChangeBalance,
};

export default PaymentsBlock;
