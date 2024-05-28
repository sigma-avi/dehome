const router = require("express").Router()

const Booking = require("../models/Booking")


/* CREATE BOOKING */

router.post("/create", async (req, res) => {
  try {
    const { customerId, listingId, hostId, startDate, endDate, totalPrice } = req.body
    const newBooking = new Booking({ customerId, listingId, hostId, startDate, endDate, totalPrice })
    await newBooking.save()
    res.status(201).json(newBooking)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: "Fail to create Booking", error: err.message });
  }
})

module.exports=router