const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        default: "https://images.pexels.com/photos/8215114/pexels-photo-8215114.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        set: (v) => v === "" ? "https://images.pexels.com/photos/8215114/pexels-photo-8215114.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" : v,
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
