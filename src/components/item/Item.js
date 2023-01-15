import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Item = ({ product, coinBalance, onBuy }) => {
  const { productImageUrl, name, price, availableUnits } = product;

	const [availableCount, setAvailableCount] = useState(availableUnits);

	const availablePrice = name && (coinBalance >= price);

  return (
    <Card className='text-center'>
      <Card.Img src={productImageUrl} variant="top"/>
      <Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>{`${price} рублей`}</Card.Text>
				<Button
					onClick={() => {
						if (price > coinBalance) return;
						onBuy(price);
						setAvailableCount(availableCount - 1);
					}}
					disabled={!availablePrice || availableCount < 1}
					style={{'width': '95%'}}
				>
					{availableCount < 1 ? 'Нет в наличии' : 'Купить'}
				</Button>
      </Card.Body>
    </Card>
  );
}
export default Item;
