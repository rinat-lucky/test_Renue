import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";

import {
  setBalance,
  coinBalance,
  refundState,
} from "../utils/propTypes";

const coinsToPay = [50, 100, 500, 1000];

const PaymentsBlock = ({ coinBalance, setBalance, refundState }) => {
  return (
    <Card.Body>
      <Row xs={1} md={4} className="g-1">
        {coinsToPay.map((item, i) => (
          <Col key={i}>
            <Button
              onClick={() => setBalance(coinBalance + item)}
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
  setBalance,
  coinBalance,
  refundState,
};

export default PaymentsBlock;
