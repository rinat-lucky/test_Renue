import { useState } from "react";
import ProductsPanel from "../productsPanel/ProductsPanel";
import ControlPanel from "../controlPanel/ControlPanel";

const App = () => {
  const [coinBalance, setBalance] = useState(0);
  const [shoppingList, setShoppingList] = useState([]);
  const [refundState, setRefundState] = useState(null);

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
            onBuy={onBuy}
            coinBalance={coinBalance}
            refundState={refundState}
          />
				</div>
				<div className="col-5">
					<ControlPanel
            coinBalance={coinBalance}
            refundState={refundState}
            shoppingList={shoppingList}
            setRefundState={setRefundState}
            onChangeBalance={onChangeBalance}
          />
				</div>
			</div>
    </div>
  );
}

export default App;
