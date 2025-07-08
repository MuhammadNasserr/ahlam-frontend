import { useParams } from "react-router-dom";
import { ProductDetailsPage } from "../components/ProductDetailsComponents";
const DetailsOfProduct = () => {
  const { id } = useParams();
  return (
    <div>
      <ProductDetailsPage id={id} />
    </div>
  );
};
export default DetailsOfProduct;
