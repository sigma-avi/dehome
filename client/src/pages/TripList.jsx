import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import { setTripList } from "../redux/state";
import Footer from "../components/Footer";
import "../styles/List.scss"

const TripList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const tripList = useSelector((state) => state.user.tripList);
  const userId=useSelector((state)=>state.user._id)
 

  const getTrips = async () => {
    try {
      const response = await fetch(
        `http://localhost:5004/users/${userId}/trips`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log(data);
      dispatch(setTripList(data));
      setLoading(false);
    } catch (error) {
      console.log("Fetch all trips failed", error.message);
    }
  };

  useEffect(() => {
    getTrips();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">
        {tripList?.map(
          ({hostId,
            listingId,
            listingPhotosPaths,
            city,
            province,
            country,
            category,
            type,
            price,
            totalPrice,
            startDate,
            endDate,
            booking = true,
          }) => (
            <ListingCard
            creator={hostId}
              listingId={listingId._id}
              listingPhotosPaths={listingId.listingPhotosPaths}
              city={listingId.city}
              province={listingId.province}
              country={listingId.country}
              category={listingId.category}
              type={type}
              price={price}
              totalPrice={totalPrice}
              booking={booking}
              startDate={startDate}
              endDate={endDate}
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default TripList;
