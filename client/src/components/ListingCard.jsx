import "../styles/ListingCard.scss";



import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setWishList} from "../redux/state";
import{
  Favorite,
  ArrowForwardIos,
  ArrowBackIosNew,
} from "@mui/icons-material";


const ListingCard = ({
  listingId,
  creator,
  listingPhotosPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  booking,
  startDate,
  endDate,
  totalPrice,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ADD TO WISHLIST */
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];

  const isLiked = wishList.find((item) => item?._id === listingId);

  const patchWishList = async () => {
    if (user._id !== creator._id) {
      const response = await fetch(
        `http://localhost:5004/users/${user._id}/${listingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setWishList(data.wishlist));
    } else {
      return;
    }
  };

  
  

  /* SLIDER FOR IMAGES */
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotosPaths.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotosPaths.length) % listingPhotosPaths.length
    );
  };

  return (
    <div
      className="listing-card"
      onClick={() => {
        navigate(`/properties/${listingId}`);
      }}
    >
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotosPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`http://localhost:5004/${photo.replace(
                  "public",
                  ""
                )}`}
                alt={`photo ${index + 1}`}
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3>
        {city}, {province}, {country}
      </h3>
      <p>{category}</p>

      {!booking ? (
        <>
          <p>{type}</p>
          <p>
            <span>${price}</span> per night
          </p>
        </>
      ) : (
        <>
          <p>
            {startDate} - {endDate}
          </p>

          <p>
            <span>${totalPrice}</span> total
          </p>
        </>
      )}

      <button
        className="favorite"
        onClick={(e) => {
          e.stopPropagation();
        patchWishList();
        
        }}
        disabled={!user}
      > 
      {isLiked ? (
        <Favorite sx={{ color: "red" }} />
      ) : (
        <Favorite sx={{ color: "white" }} />
      )}
        
      </button>
    </div>
  );
};

export default ListingCard;
