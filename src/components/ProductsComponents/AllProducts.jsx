import Calendar from "./Calendar";
import FetchProducts from "./FetchProducts";

export const AllProducts = () => {
  return (
    <div className="my-5 pb-5">
      <div className="container">
        <div className="content">
          {/* Your other components */}
          <Calendar />
          <FetchProducts />
        </div>
      </div>
    </div>
  );
};
