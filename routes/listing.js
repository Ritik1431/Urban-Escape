const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    validateListing,
    wrapAsync(listingController.createListing)
  );

router.route("/:id").get(wrapAsync(listingController.showListing));

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .get("/:id", wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateRoute)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteRoute));


// Edit Route
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.editRoute));



module.exports = router;
