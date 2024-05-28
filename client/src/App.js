import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Register from "./pages/Register"
import Login from "./pages/Login"
import "./App.css";
import CreateListing from './pages/CreateListing';
import ListingDetails from './pages/ListingDetails';
import TripList from "./pages/TripList"
import Wishlist from './pages/WishList';
import PropertyList from './pages/PropertyList';
import ReservationList from './pages/ResrvationList';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';



const App = () => {
  return (
    <>
   
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="create-listing" element={<CreateListing/>}/>
      <Route path="properties/:listingId" element={<ListingDetails/>}/>
      <Route path="properties/category/:category" element={<CategoryPage/>}/>
      <Route path="properties/search/:search" element={<SearchPage/>}/>
      <Route path="/:userId/trips" element={<TripList/>}/>
      <Route path="/:userId/wishList" element={<Wishlist/>}/>
      <Route path="/:userId/properties" element={<PropertyList/>}/>
      <Route path="/:userId/reservations" element={<ReservationList/>}/>

      
    </Routes>
    
    
    
    </>
  )
}

export default App