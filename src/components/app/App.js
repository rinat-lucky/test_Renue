import { useState, useEffect, useMemo } from "react";

import VendingAPI from "../../api/VendingAPI";
import ProductsPanel from "../productsPanel/ProductsPanel";
import ControlPanel from "../controlPanel/ControlPanel";

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

  const onChangeBalance = (total) => setBalance(total);

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
            coinBalance={coinBalance}
            refundState={refundState}
            shoppingList={shoppingList}
            products={availableProducts}
            setRefundState={setRefundState}
            onChangeBalance={onChangeBalance}
          />
				</div>
			</div>
    </div>
  );
}

export default App;
