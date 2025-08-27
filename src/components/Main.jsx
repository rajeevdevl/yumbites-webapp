import RestaurantCard from "./RestaurantCard";
// import { resList } from "../utils/resData";
import { use, useEffect, useState } from "react";
// import { ShimmerPostList } from "react-shimmer-effects";
import ShimmerUi from "./ShimmerUi";
import SwiggyNotFound from "./SwiggyNotFound";

const Main = () => {
  const [originalResList, setOriginalResList] = useState([]);
  const [newResList, setNewResList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [fetchApi, setFetchApi] = useState("");

  //
  useEffect(() => {
    fetchData();
  }, []);

  const getSwiggyRes = async () => {
    const resData = await fetch(
      "https://proxy.corsfix.com/?https://corsproxy.io/?url=https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=28.5114511&lng=77.0632821&carousel=true&third_party_vendor=1"
    );
    if (!resData.ok) {
      setFetchApi("error");
      //   throw new Error("api down");
    }
    const result = await resData.json();
    const apiRes =
      result?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    if (apiRes && apiRes.length > 0) {
      setOriginalResList(apiRes);
      setNewResList(apiRes);
    } else {
      setFetchApi("error");
    }

    // setOriginalResList(
    //   result?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
    //     ?.restaurants
    // );
    // setNewResList(
    //   result?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
    //     ?.restaurants
    // );
    setFetchApi("swiggy");
  };

  useEffect(() => {
    if (fetchApi !== "swiggy") {
      const filteredRes = originalResList.filter((res) => {
        return res.itemName.toLowerCase().includes(inputValue.toLowerCase());
      });
      setNewResList(filteredRes);
    } else {
      const filteredRes = originalResList.filter((res) => {
        return res.info.name.toLowerCase().includes(inputValue.toLowerCase());
      });
      setNewResList(filteredRes);
    }
  }, [inputValue]);

  // fetching data of restaurants from API
  const fetchData = async () => {
    const fallbackApi = await fetch(
      "https://proxy.corsfix.com/?https://fakerestaurantapi.runasp.net/api/Restaurant/items"
    );

    const result = await fallbackApi.json();

    setOriginalResList(result);
    setNewResList(result);
  };

  return (
    <main>
      <section className="search">
        <input
          type="text"
          className="search-input"
          placeholder="Find your taste "
          onChange={(e) => {
            setInputValue(e.target.value);
            console.log(e.target.value);
          }}
          value={inputValue}
        />
        {/* <button onClick={() => {}}>Search</button> */}
      </section>
      {originalResList.length > 0 ? (
        <>
          <div className="filter-btn">
            <div className="btn-left">
              <button
                onClick={() => {
                  getSwiggyRes();
                }}
              >
                Get Swiggy Restaurant Items
              </button>
            </div>
            <div className="btn-right">
              <button
                onClick={() => {
                  setNewResList(
                    newResList.filter((res) => Number(res.restaurantID) > 10)
                  );
                }}
              >
                Highest rates Restaurant
              </button>
              <button
                onClick={() => {
                  setNewResList(originalResList);
                }}
              >
                Reset
              </button>
            </div>
          </div>
          {fetchApi == "error" && <SwiggyNotFound />}
          {fetchApi == "swiggy" ? (
            <section className="res-container">
              {newResList.map((res) => (
                <RestaurantCard
                  key={res.info.id}
                  name={res.info.name}
                  rating={res.info.avgRating}
                  img={res.info.cloudinaryImageId}
                  cuisines={res.info.cuisines.join(",")}
                  price={res.info.costForTwo}
                  imgApi={fetchApi}
                />
              ))}
            </section>
          ) : (
            <section className="res-container">
              {newResList.map((res) => (
                <RestaurantCard
                  key={res.itemID}
                  name={res.itemName}
                  rating={res.restaurantID}
                  img={res.imageUrl}
                  cuisines={res.itemDescription}
                  price={res.itemPrice}
                />
              ))}
            </section>
          )}
        </>
      ) : (
        <ShimmerUi />
      )}
    </main>
  );
};

export default Main;
