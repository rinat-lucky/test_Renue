import {useState} from "react";
import ProductsPanel from "../productsPanel/ProductsPanel";
import ControlPanel from "../controlPanel/ControlPanel";

const App = () => {
  const [coinBalance, setCoin] = useState(0);

  const onCoinChanged = (total) => {
    setCoin(total);
  };

  const onBuy = (price) => {
    setCoin(coinBalance - price);
  };

  return (
    <div className="container">
			<div className="row my-3">
				<div className="col-8">
					<ProductsPanel coinBalance={coinBalance} onBuy={onBuy} />
				</div>
				<div className="col-4">
					<ControlPanel coinBalance={coinBalance} onCoinChanged={onCoinChanged} />
				</div>
			</div>
    </div>
  );
}

export default App;
