import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { makeSortedList } from "../utils/helpers";
import { shopList } from '../utils/propTypes';

const ShopList = ({ shopList }) => {
  const sortedShopList = makeSortedList(shopList, 1);

  return (
    <Card>
      <Card.Header className="text-center">Список покупок</Card.Header>
      <ListGroup variant="flush" numbered>
        {sortedShopList.map((item) => {
          return (
            <ListGroup.Item key={item[0]} className="d-flex justify-content-between align-items-center">
              <div className="ms-2 me-auto">{item[0]}</div>  
              <Badge>{item[1]}</Badge>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Card>
  );
};

ShopList.propTypes = { shopList };

export default ShopList;
