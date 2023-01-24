import { useState, useEffect, useMemo } from "react";
import { useDispatch } from 'react-redux';

import ProductsPanel from "./ProductsPanel";
import ControlPanel from "./ControlPanel";

import VendingAPI from "../api/VendingAPI";
import { setProducts, buyProduct } from "../slices/productsSlice";
import { addToShopList } from "../slices/shopListSlice";

const App = () => {
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
    dispatch(addToShopList(product.name));
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
          />
				</div>
				<div className="col-5">
					<ControlPanel
            setBalance={setBalance}
            coinBalance={coinBalance}
            refundState={refundState}
            setRefundState={setRefundState}
          />
				</div>
			</div>
    </div>
  );
}

export default App;
