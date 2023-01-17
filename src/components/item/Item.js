import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Item = (props) => {
	const { coinBalance, onBuy, product, refundState } = props;
  const { productImageUrl, name, price, availableUnits } = product;
	const [availableCount, setAvailableCount] = useState(availableUnits);

  const disable = (coinBalance < price) || !availableCount || (refundState === 'completed');

	const handleClick = () => {
		onBuy(product);
		setAvailableCount(availableCount - 1);
	};

	return (
		<Card className='text-center'>
			<Card.Img src={productImageUrl} variant="top"/>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>{`${price} рублей`}</Card.Text>
				<Button
					onClick={handleClick}
					disabled={disable}
					style={{'width': '100%'}}
				>
					{availableCount ? 'Купить' : 'Нет в наличии'}
				</Button>
			</Card.Body>
		</Card>
	);
};

export default Item;
