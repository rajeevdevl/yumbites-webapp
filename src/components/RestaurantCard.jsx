import { CDN_URL } from "../utils/constant";

const RestaurantCard = ({ name, rating, img, cuisines, price, imgApi }) => {
  return (
    <div className="res-card">
      <h2>{name}</h2>
      <div className="img-container">
        {imgApi == "swiggy" ? (
          <img
            className="res-img"
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
              img
            }
            alt=""
          />
        ) : (
          <img className="res-img" src={img} alt="" />
        )}
      </div>
      <ul className="card-info">
        <li>
          <h4>{cuisines}</h4>
        </li>
        {/* <li>{rating}</li> */}
        <li className="price">
          <h5>₹ {price / 2} for two</h5>
        </li>
      </ul>
    </div>
  );
};

export default RestaurantCard;
