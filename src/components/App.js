import { useState, useEffect, useMemo } from "react";

import ProductsPanel from "./ProductsPanel";
import ControlPanel from "./ControlPanel";

import VendingAPI from "../api/VendingAPI";

const App = () => {
  const [availableProducts, setAvailableProducts] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [refundState, setRefundState] = useState('');
  const [coinBalance, setBalance] = useState(0);

  const api = useMemo(() => new VendingAPI(), []);

	useEffect(() => {
    const fetchData = async () => setAvailableProducts(await api.getProducts());
    fetchData();
  }, [api]);

  const getUpdatedProducts = (purchasedProduct) => {
    const targetProduct = availableProducts.find((product) => product.id === purchasedProduct.id);
    targetProduct.availableUnits -= 1;
    return availableProducts;
  }

  const onBuy = (product) => {
    setBalance(coinBalance - product.price);
    setShoppingList([...shoppingList, product.name]);
    setAvailableProducts(getUpdatedProducts(product));
  };

  return (
    <div className="container">
      <div className="row my-3">
				<div className="col-7">
					<ProductsPanel
            onBuy={onBuy}
            coinBalance={coinBalance}
            refundState={refundState}
            products={availableProducts}
          />
				</div>
				<div className="col-5">
					<ControlPanel
            setBalance={setBalance}
            coinBalance={coinBalance}
            refundState={refundState}
            shoppingList={shoppingList}
            products={availableProducts}
            setRefundState={setRefundState}
          />
				</div>
			</div>
    </div>
  );
}

export default App;
