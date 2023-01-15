import Button from 'react-bootstrap/Button';

const RefundButton = ({ toRefund }) => {
  const getRefund = () => {
    console.log('Сумма к возврату', toRefund);
  };
  
  return (
    <Button onClick={getRefund}>Получить сдачу</Button>
  );
};

export default RefundButton;
