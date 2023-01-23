import Badge from "react-bootstrap/Badge";
import { extraProducts } from "../utils/propTypes";

const ExtraProductsList = ({ extraProducts }) => {
  return (
    <div className="mt-1">
      {extraProducts.map((product) => {
        return (
          <div key={product[0]} className="d-flex justify-content-between align-items-center">
            <div>{product[0]}</div>  
            <Badge>{product[1]}</Badge>
          </div>
        );
      })}
    </div>
  );
};

ExtraProductsList.propTypes = {
  extraProducts,
};

export default ExtraProductsList;
