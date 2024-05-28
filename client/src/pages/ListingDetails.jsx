import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { facilities } from "../data";
import "../styles/ListingDetails.scss";
import variables from "../styles/variables.scss";
import Loader from "../components/Loader";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { setWishList } from "../redux/state";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDispatch, useSelector } from "react-redux";

const ListingDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [host, setHost] = useState(null);

  const getListing = async () => {
    try {
      const response = await fetch(
        `http://localhost:5004/properties/${listingId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setListing(data);
      setLoading(false)
      // await getHost(data.userId);
    } catch (error) {
      console.log("Fetch Listing failed", error.message);
    }
  };
  console.log(listing)

  
  // }

  useEffect(()=>{
    getListing()
  },[])

  

  /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    // Update the selected date range when the user makes a selection
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24)); // Calculate the difference in days



  
  const customerId = useSelector((state) => state?.user?._id);

  const handleSubmit = async () => {
    try {
      const data = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      };

      const response = await fetch("http://localhost:5004/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Convert the data object to a JSON string
      });
      if (response.ok) {
        navigate(`/${customerId}/trips`);
      }
    } catch (err) {
      console.log("Submit Booking failed", err.message);
    }
  };





  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="listing-details">
        

        <div className="photos">
          {listing.listingPhotosPaths?.map((item) => (
            <img
              src={`http://localhost:5004/${item.replace("public", "")}`}
              alt="listing"
            />
          ))}
        </div>
        <h2>
          {listing.type} in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom -{" "}
          {listing.bedCount} bed - {listing.bathroomCount} bath
        </p>
        <hr />
        <div className="profile">
          <img
            src={`http://localhost:5004/${listing.creator.profileImagePath?.replace("public","")}`}
            alt="profile"
          />
          <h3>
            Hosted by {listing.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr />
        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />
        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>
        <hr />
        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item) => (
                <div className="facility" key={item.name}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2>
                  ${listing.price} x {dayCount} nights
                </h2>
              ) : (
                <h2>
                  ${listing.price} x {dayCount} night
                </h2>
              )}
              <h2>Total price: ${listing.price * dayCount}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>

              <button className="button" type="submit" onClick={handleSubmit}>
                BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListingDetails;
