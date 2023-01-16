import { useState, useEffect } from "react";
import VendingAPI from "../../api/VendingAPI";
import ProductsPanel from "../productsPanel/ProductsPanel";
import ControlPanel from "../controlPanel/ControlPanel";

const App = () => {
  const [coinBalance, setBalance] = useState(0);
  const [coinsToPay, setCoinsToPay] = useState([]);
  const [coinsToRefund, setCoinsToRefund] = useState([]);
  const [products, setProducts] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  const api = new VendingAPI();

	useEffect(() => {
    const fetchData = async () => {
      setProducts(await api.getProducts());
      setCoinsToPay(await api.getCoinsToPay());
      setCoinsToRefund(await api.getCoinsToRefund());
    } 
    fetchData();
  }, []);

  const onChangeBalance = (total) => {
    setBalance(total);
  };

  const onBuy = (product) => {
    setBalance(coinBalance - product.price);
    setShoppingList([...shoppingList, product.name]);
  };

  return (
    <div className="container">
			<div className="row my-3">
				<div className="col-7">
					<ProductsPanel
            coinBalance={coinBalance}
            onBuy={onBuy}
            products={products}
          />
				</div>
				<div className="col-5">
					<ControlPanel
            coinBalance={coinBalance}
            onChangeBalance={onChangeBalance}
            coinsToPay={coinsToPay}
            coinsToRefund={coinsToRefund}
            shoppingList={shoppingList}
          />
				</div>
			</div>
    </div>
  );
}

export default App;
