module.exports.isLoggedIn = (req, res, next) =>{
    if (!req.isAuthenticated()) {
        req.flash("error", "User is not logged in");
        return res.redirect("/login");
    }
    next();
}