const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js")
// Index Route
router.get(
    "/",
    wrapAsync(listingController.index)
);

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show ROute
router.get(
    "/:id",
    wrapAsync(listingController.showListing)
);

// Create Route
router.post(
    "/",
    validateListing,
    wrapAsync(listingController.createListing)
);

// Edit Route
router.get(
    "/:id/edit",
    isLoggedIn,
    wrapAsync(listingController.editRoute)
);
//Update
router.put(
    "/:id",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateRoute)
);
//Delete
router.delete(
    "/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteRoute)
);

module.exports = router;
