import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import { setReservationList } from "../redux/state";
import Footer from "../components/Footer";
import "../styles/List.scss"

const ReservationList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const reservationList = useSelector((state) => state.user.reservationList);
  const userId=useSelector((state)=>state.user._id)
 

  const getReservationList = async () => {
    try {
      const response = await fetch(
        `http://localhost:5004/users/${userId}/reservations`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log(data);
      dispatch(setReservationList(data));
      setLoading(false);
    } catch (error) {
      console.log("Fetch all reservation failed", error.message);
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Reservation  List</h1>
      <div className="list">
        {reservationList?.map(
          ({
            key,
            hostId,
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
            key={listingId._id}
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

export default ReservationList;
