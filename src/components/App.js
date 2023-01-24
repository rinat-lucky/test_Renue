import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';

import ProductsPanel from "./ProductsPanel";
import ControlPanel from "./ControlPanel";

import VendingAPI from "../api/VendingAPI";
import { setProducts, buyProduct } from "../slices/productsSlice";
import { addToShopList } from "../slices/shopListSlice";
import { setBalance } from "../slices/balanceSlice";
import { setCoins } from "../slices/refundSlice";

const App = () => {
  const coinBalance = useSelector((state) => state.balance.value);
  const dispatch = useDispatch();
  const api = useMemo(() => new VendingAPI(), []);

	useEffect(() => {
    const fetchData = async () => {
      dispatch(setProducts(await api.getProducts()));
      dispatch(setCoins(await api.getCoinsToRefund()));
    };
    fetchData();
  }, [api, dispatch]);

  const onBuy = (product) => {
    dispatch(setBalance(coinBalance - product.price));
    dispatch(addToShopList(product.name));
    dispatch(buyProduct(product));
  };

  return (
    <div className="container">
      <div className="row my-3">
				<div className="col-7"><ProductsPanel onBuy={onBuy} /></div>
				<div className="col-5"><ControlPanel /></div>
			</div>
    </div>
  );
}

export default App;
