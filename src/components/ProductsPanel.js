import { useSelector } from 'react-redux';

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";

import { onBuy } from '../utils/propTypes';

const ProductsPanel = ({ onBuy }) => {
	const products = useSelector((state) => state.products.value);
	const coinBalance = useSelector((state) => state.balance.value);
	const refundState = useSelector((state) => state.refund.status);
	
	const renderItems = () => products.map((product) => {
		const { id, productImageUrl, name, price, availableUnits } = product;
		const disable = (coinBalance < price) || !availableUnits || (refundState === "completed");

		return (
			<Col key={id}>
				<Card className="text-center">
					<Card.Img src={productImageUrl} variant="top" alt={name} />
					<Card.Body>
						<Card.Title>{name}</Card.Title>
						<Card.Text>{price} &#8381;</Card.Text>
						<Button
							onClick={() => onBuy(product)}
							style={{"width": "100%"}}
							disabled={disable}
						>
							{availableUnits ? "Купить" : "Нет в наличии"}
						</Button>
					</Card.Body>
				</Card>
			</Col>
		);
	});

	return (<Row xs={1} md={4} className="g-3">{renderItems()}</Row>);
};

ProductsPanel.propTypes = { onBuy };

export default ProductsPanel;
