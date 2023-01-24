import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';

import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";

import RefundList from "./RefundList";
import ShopList from "./ShopList";
import BalanceBlock from "./BalanceBlock";
import PaymentsBlock from "./PaymentsBlock";

import VendingAPI from "../api/VendingAPI";
import { setCoins } from "../slices/refundSlice";

const ControlPanel = () => {
  const shopList = useSelector((state) => state.shopList.value);
  const refundState = useSelector((state) => state.refund.status);
  const dispatch = useDispatch();
  const api = useMemo(() => new VendingAPI(), []);

  useEffect(() => {
    const fetchData = async () => dispatch(setCoins(await api.getCoinsToRefund()));
    fetchData();
  }, [api, dispatch]);

  return (  
    <Row>
      <Col className="d-flex flex-column">
        <Card className="mb-3">
          <Card.Header className="text-center">Внесите деньги</Card.Header>
          <PaymentsBlock />
        </Card>
        <Alert variant="success" className="d-flex flex-row justify-content-between align-items-center mb-3">
          <BalanceBlock />
        </Alert>
        <Row xs={1} md={2} className="g-3">
          <Col>{(shopList.length > 0) && (<ShopList shopList={shopList}/>)}</Col>  
          <Col>{(refundState !== '') && (<RefundList />)}</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ControlPanel;
