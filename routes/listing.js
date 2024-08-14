const express = require("express")
const router = express.Router();
const { listingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};


// Index Route
router.get(
    "/",
    wrapAsync(async (req, res) => {
        const allListings = await Listing.find({});
        console.log(allListings);
        res.render("./listings/index.ejs", { allListings });
    })
);

// New Route
router.get("/new", (req, res) => {
    res.render("./listings/new.ejs");
});

// Show ROute
router.get(
    "/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id).populate("reviews");
        if(!listing){
            req.flash("error", "Listing you requested doesn't exists!");
            res.redirect("/listings");
        }
        res.render("./listings/show.ejs", { listing });
    })
);

// Create Route
router.post(
    "/",
    validateListing,
    wrapAsync(async (req, res, next) => {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        req.flash("success", "New listing Created");
        res.redirect("/listings");
    })
);

// Edit Route
router.get(
    "/:id/edit",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing you requested doesn't exists!");
            res.redirect("/listings");
        }
        res.render("./listings/edit.ejs", { listing });
    })
);
//Update
router.put(
    "/:id",
    validateListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        req.flash("success", "Listing Updated Successfully");
        res.redirect(`/listings/${id}`);
    })
);
//Delete
router.delete(
    "/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash("success", "Listing Deleted Successfully");
        res.redirect("/listings");
    })
);

module.exports = router;