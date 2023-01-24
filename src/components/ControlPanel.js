import { useEffect, useMemo, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";

import RefundList from "./RefundList";
import ShopList from "./ShopList";
import BalanceBlock from "./BalanceBlock";
import PaymentsBlock from "./PaymentsBlock";

import VendingAPI from "../api/VendingAPI";
import {
  setBalance,
  coinBalance,
  refundState,
  shoppingList,
  setRefundState,
} from "../utils/propTypes";

const ControlPanel = (props) => {
  
  const {
    setBalance,
    coinBalance,
		refundState,
    shoppingList,
		setRefundState,
	} = props;
  const [coinsToRefund, setCoinsToRefund] = useState([]);

  const api = useMemo(() => new VendingAPI(), []);

  useEffect(() => {
    const fetchData = async () => setCoinsToRefund(await api.getCoinsToRefund());
    fetchData();
  }, [api]);

  return (  
    <Row>
      <Col className="d-flex flex-column">
        <Card className="mb-3">
          <Card.Header className="text-center">Внесите деньги</Card.Header>
          <PaymentsBlock 
            setBalance={setBalance}
            refundState={refundState}
            coinBalance={coinBalance}
          />
        </Card>
        <Alert variant="success" className="d-flex flex-row justify-content-between align-items-center mb-3">
          <BalanceBlock
            refundState={refundState}
            coinBalance={coinBalance}
            setRefundState={setRefundState}
          />
        </Alert>
        <Row xs={1} md={2} className="g-3">
          <Col>
            {shoppingList.length > 0 && (<ShopList shoppingList={shoppingList}/>)}
          </Col>  
          <Col>
            {(refundState !== '')
              && (<RefundList
                    coinBalance={coinBalance}
                    coinsToRefund={coinsToRefund}
                    setRefundState={setRefundState}
                  />) 
            }
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

ControlPanel.propTypes = {
  setBalance,
  coinBalance,
  refundState,
  shoppingList,
  setRefundState,
};

export default ControlPanel;
