const User = require("../models/user");

module.exports.userSignUp = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newuser = new User({ email, username });
        const registeredUser = await User.register(newuser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Urban Escape");
            res.redirect("/listings");
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}
module.exports.renderLogin = (req, res) => {
    res.render("users/login.ejs");
}
module.exports.Login = async (req, res) => {
    req.flash("success", "Welcome to Urban Escape! You are logged in.");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}
module.exports.logOut = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are LogOut now!")
        res.redirect("listings");
    })
}
module.exports.renderSignUp = (req, res) => {
    res.render("users/signup.ejs");
}