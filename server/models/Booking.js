const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema (
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Listing"
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    totalPrice:{
        type:Number,
        require:true
    }

},
{timestamps:true}
)

const Booking = mongoose.model("Booking", BookingSchema)

module.exports = Booking