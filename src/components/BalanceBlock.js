import { useSelector, useDispatch } from 'react-redux';

import Button from "react-bootstrap/Button";

import { updateStatus } from "../slices/refundSlice";

const BalanceBlock = () => {
  const refundState = useSelector((state) => state.refund.status);
  const coinBalance = useSelector((state) => state.balance.value);
  const dispatch = useDispatch();

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
          <Button
            onClick={() => dispatch(updateStatus("requested"))}
            disabled={!coinBalance}
          >
              Получить сдачу
          </Button>
        </>
      );
    default:
      throw new Error(`Unknown refundState: ${refundState}`);
  }
};

export default BalanceBlock;
