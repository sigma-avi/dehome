import { useParams } from "react-router-dom";
import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
import { useState, useEffect } from "react";
import ListingCard from "../components/ListingCard";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const { search } = useParams();
  const listings = useSelector((state) => state.listings);
  const dispatch = useDispatch();

  const getSearchListings = async () => {
    try {
      const response = await fetch(`http://localhost:5004/properties/search/${search}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({listings:data}));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Search List failed!", err.message);
    }
  };

  useEffect(() => {
    getSearchListings();
  }, [search]);
  console.log(listings)

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">{search}</h1>
      <div className="list">
        {listings?.map(
          ({
            _id,
            creator,
            listingPhotosPaths,
            city,
            province,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard
              listingId={_id}
              creator={creator}
              listingPhotosPaths={listingPhotosPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
            />
          )
        )}
      </div>
    </>
  );
};

export default SearchPage;
