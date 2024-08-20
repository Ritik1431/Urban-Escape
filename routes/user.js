const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const flash = require("connect-flash");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user")

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(userController.userSignUp)
);

router.get("/login", userController.renderLogin);


router.post(
  "/login",
  saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
  userController.Login
);

router.get("/logout", userController.logOut)
module.exports = router;
