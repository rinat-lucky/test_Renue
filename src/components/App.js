import { useState, useEffect, useMemo } from "react";
import { useDispatch } from 'react-redux';

import ProductsPanel from "./ProductsPanel";
import ControlPanel from "./ControlPanel";

import VendingAPI from "../api/VendingAPI";
import { setProducts, buyProduct } from "../slices/productsSlice";

const App = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [refundState, setRefundState] = useState('');
  const [coinBalance, setBalance] = useState(0);

  const dispatch = useDispatch();

  const api = useMemo(() => new VendingAPI(), []);

	useEffect(() => {
    const fetchData = async () => dispatch(setProducts(await api.getProducts()));
    fetchData();
  }, [api, dispatch]);

  const onBuy = (product) => {
    setBalance(coinBalance - product.price);
    setShoppingList([...shoppingList, product.name]);
    dispatch(buyProduct(product));
  };

  return (
    <div className="container">
      <div className="row my-3">
				<div className="col-7">
					<ProductsPanel
            onBuy={onBuy}
            coinBalance={coinBalance}
            refundState={refundState}
            // products={availableProducts}
          />
				</div>
				<div className="col-5">
					<ControlPanel
            setBalance={setBalance}
            coinBalance={coinBalance}
            refundState={refundState}
            shoppingList={shoppingList}
            // products={availableProducts}
            setRefundState={setRefundState}
          />
				</div>
			</div>
    </div>
  );
}

export default App;
