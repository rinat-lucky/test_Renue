import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";

const ProductsPanel = (props) => {
	const {
		coinBalance,
		onBuy,
		refundState,
		products,
	} = props;
	
	const renderItems = () => {
		return products.map((product) => {
			const { id, productImageUrl, name, price, availableUnits } = product;
			const disable = (coinBalance < price)
				|| !availableUnits
				|| (refundState === "completed");

			return (
				<Col key={id}>
					<Card className="text-center">
						<Card.Img src={productImageUrl} variant="top" alt={name} />
						<Card.Body>
							<Card.Title>{name}</Card.Title>
							<Card.Text>{price} &#8381;</Card.Text>
							<Button
								onClick={() => onBuy(product)}
								disabled={disable}
								style={{"width": "100%"}}
							>
								{availableUnits ? "Купить" : "Нет в наличии"}
							</Button>
						</Card.Body>
					</Card>
				</Col>
			);
		})
	};

	return (
		<Row xs={1} md={4} className="g-3">
			{renderItems()}
		</Row>
  );
};

ProductsPanel.propTypes = {
  onBuy: PropTypes.func.isRequired,
	refundState: PropTypes.string.isRequired,
  coinBalance: PropTypes.number.isRequired,
	products: PropTypes.arrayOf(PropTypes.exact({
    name: PropTypes.string,
		productImageUrl: PropTypes.string,
		id: PropTypes.number, 
		price: PropTypes.number, 
		availableUnits: PropTypes.number,
  })).isRequired,
}

export default ProductsPanel;
