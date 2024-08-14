const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")
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
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref : "Review"
        }
    ]
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ reviews: { $in: listing.reviews } });
    }
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
