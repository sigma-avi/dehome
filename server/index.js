const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors")
const authRoutes=require("./routes/auth.js")
const listingRoutes=require("./routes/listing.js")
const BookingRoutes=require("./routes/booking.js")
const userRoutes=require("./routes/user.js")



app.use(cors()); // Block other request which is not from your domain
app.use(express.json());

/* Serve static files from the "public" directory */
app.use(express.static('public'));

app.use("/auth",authRoutes)
app.use("/properties",listingRoutes)
app.use("/bookings",BookingRoutes)
app.use("/users",userRoutes)


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5004;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName:'new_user2',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
