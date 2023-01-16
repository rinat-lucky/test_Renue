import { Col, Row } from "react-bootstrap";
import Item from "../item/Item";

const ProductsPanel = ({ coinBalance, onBuy, products }) => {
	return (
		<Row xs={1} md={4} className="g-3">
			{products && products.map((product) => {
				return (
					<Col key={product.id}>
						<Item product={product} coinBalance={coinBalance} onBuy={onBuy} />
					</Col>
				);
			})}
		</Row>
  );
}
export default ProductsPanel;
