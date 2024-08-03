const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../Urban Escape/models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const MONGO_URL = "mongodb://127.0.0.1:27017/urbanescape";
main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

// Root Route
app.get("/", (req, res) => {
    console.log("hello i am root");
    res.send("Hi i am root");
});

// Index Route
app.get("/listings", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.render("./listings/index.ejs", { allListings });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

// New Route
app.get("/listings/new", (req, res) => {
    res.render("./listings/new.ejs");
});

// Show Route
app.get("/listings/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).send("Listing Not Found");
        }
        res.render("./listings/show.ejs", { listing });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

// Create Route
app.post("/listings", async (req, res) => {
    try {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).send("Listing Not Found");
        }
        res.render("./listings/edit.ejs", { listing });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

// Update Route
app.put("/listings/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

// Delete Route
app.delete("/listings/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedListing = await Listing.findByIdAndDelete(id);
        if (!deletedListing) {
            return res.status(404).send("Listing Not Found");
        }
        console.log(deletedListing);
        res.redirect("/listings");
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

app.listen(8080, () => {
    console.log("app is listening to port: 8080");
});
