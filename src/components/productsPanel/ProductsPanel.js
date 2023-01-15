import Item from "../item/Item";
import { products } from "../../data";
import { Col, Row } from "react-bootstrap";

const ProductsPanel = ({ coinBalance, onBuy }) => {
	return (
		<div className="container">
			<Row xs={1} md={4} className="g-4">
				{products && products.map((product) => {
					return (
						<Col key={product.id}>
							<Item product={product} coinBalance={coinBalance} onBuy={onBuy} />
						</Col>
					);
				})}
			</Row>
		</div>
  );
}
export default ProductsPanel;
