import { useEffect } from "react";
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const RefundList = (props) => {
  const { sumToRefund, setRefundState, coinsToRefund } = props;
  
  useEffect(() => {
    setRefundState('completed');
  }, [setRefundState]);

  return (
    <Card>
      <Card.Header className='text-center'>Сдача: {sumToRefund} рублей</Card.Header>
      <ListGroup variant="flush">
        {coinsToRefund.map((coin) => {
          return (
            <ListGroup.Item key={coin.denomination} className="d-flex justify-content-between align-items-center">
              <div>{coin.denomination} руб.</div>  
              <Badge>{'0'}</Badge>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Card>
  );
};

export default RefundList;
