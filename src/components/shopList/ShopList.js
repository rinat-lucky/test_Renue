import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { makeSortedList } from "../utils";
import { shoppingList } from "../propTypes";

const ShopList = ({ shoppingList }) => {
  const shopList = makeSortedList(shoppingList, 1);

  return (
    <Card>
      <Card.Header className="text-center">Список покупок</Card.Header>
      <ListGroup variant="flush" numbered>
        {shopList.map((item) => {
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

ShopList.propTypes = {
  shoppingList,
};

export default ShopList;
