import { useState, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import VendingAPI from "../../api/VendingAPI";
import Item from "../item/Item";

const ProductsPanel = (props) => {
	const { coinBalance, onBuy, refundState } = props;
	const [products, setProducts] = useState([]);

  const api = useMemo(() => {
    return new VendingAPI();
  }, []);

	useEffect(() => {
    const fetchData = async () => setProducts(await api.getProducts());
    fetchData();
  }, [api]);
	
	return (
		<Row xs={1} md={4} className="g-3">
			{products && products.map((product) => {
				return (
					<Col key={product.id}>
						<Item 
							onBuy={onBuy}
							product={product}
							refundState={refundState}
							coinBalance={coinBalance}
						/>
					</Col>
				);
			})}
		</Row>
  );
}

export default ProductsPanel;
