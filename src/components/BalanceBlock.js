import Button from "react-bootstrap/Button";
import {
  coinBalance,
  refundState,
  setRefundState,
} from "../utils/propTypes";

const BalanceBlock = ({ refundState, coinBalance, setRefundState }) => {
  switch (refundState) {
    case "completed": 
      return (
        <div className="mx-auto">Спасибо за покупку &#128578;</div>
      );
    case "":
    case "requested":
      return (
        <>
          <div>Доступная сумма: <span className="fw-bold">{coinBalance}</span> рублей</div>
          <Button onClick={() => setRefundState("requested")} disabled={!coinBalance}>
            Получить сдачу
          </Button>
        </>
      );
    default:
      throw new Error(`Unknown refundState: ${refundState}`);
  }
};

BalanceBlock.propTypes = {
  coinBalance,
  refundState,
  setRefundState,
};

export default BalanceBlock;
