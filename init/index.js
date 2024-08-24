const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/urbanescape";
main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
}
const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>( {
        ...obj,
        owner: "66c9960a321b6427e518f92a"
    }))
    await Listing.insertMany(initData.data);
    console.log("data was intialized");
}
initDB();