import "../styles/Listings.scss";
import { setListings } from "../redux/state";
import Loader from "./Loader";
import ListingCard from "./ListingCard";

import { categories } from "../data";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
          selectedCategory !== "All"
          ? `http://localhost:5004/properties?category=${selectedCategory}`
          : "http://localhost:5004/properties",
        {
          method: "GET",
        }
      );

      const data = await response.json();

      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (error) {
      console.log("Fetch Listings failed", error.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  console.log(listings)
  

  return (
    <>
      <div className="category-list">
        {categories?.map((category, index) => (
          <div
            className={`category ${
              category.label === selectedCategory ? "selected" : ""
            }`}
            key={index}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map(
            ({
              _id,
              listingPhotosPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
              creator
            }) => (
              <ListingCard
                listingId={_id}
                listingPhotosPaths={listingPhotosPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
                creator={creator}
              />
            )
          )}
        </div>
      )}
      
        
    
    </>
  );
};

export default Listings;
