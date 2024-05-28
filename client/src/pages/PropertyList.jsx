import { useDispatch, useSelector } from "react-redux";
import "../styles/ListingCard.scss";
import ListingCard from "../components/ListingCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/List.scss"
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";



const PropertyList = () => {
  const [loading,setLoading]=useState(true)
  const user=useSelector((state)=>state.user)
  const propertyList = user?.propertyList;
  const dispatch=useDispatch();



  const getPropertyList= async()=>{
    try {
      const response= await fetch(`http://localhost:5004/users/${user._id}/properties`,{
        method:"GET"
      })

      const data=await response.json()
      dispatch(setPropertyList(data))
      setLoading(false);

    } catch (err) {
      console.log("fetch all property fail",err.message)
      
    }
  }
console.log(propertyList)
  useEffect(()=>{
    getPropertyList()
  },[])
  return (loading?<Loader/>:
    <>
      <Navbar />
        <h1 className="title-list">Your Property List</h1>
        <div className="list">
          {propertyList?.map(
            ({
              _id,
              listingPhotosPaths,
              creator,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false
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
        <Footer />
    </>
  );
};

export default PropertyList;
