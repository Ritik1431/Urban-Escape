const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const flash = require("connect-flash");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user")

router.route("/signup")
  .get(
    userController.renderSignUp)
  .post(
    wrapAsync(userController.userSignUp)
  );

router
  .route("/login")
  .get(userController.renderLogin)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.Login
  );

router.get("/logout", userController.logOut)
module.exports = router;
