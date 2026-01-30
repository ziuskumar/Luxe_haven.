const User = require("../Models/user.js");
const Listing = require("../Models/listing.js");

module.exports = {
    signup:async (req, res) => {
        let {username, email,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.flash("success", "Welcome to TheAIR!");
        res.redirect("/listings");
    }
    ,
    renderlogin:async (req, res) => {
        res.render("users/login.ejs");
    }
    ,
    postLogin:async (req, res) => {
    req.flash("success", "Welcome back to TheAIR!");
    res.redirect(req.session.redirectUrl || "/listings");
 
  } 
    ,
    logout:async (req, res) => {
        req.flash("success", "Welcome back to TheAIR!");
        res.redirect(req.session.redirectUrl || "/listings");
    }
    ,
    postLogout:async (req, res, next) => {
        req.logout((err) => {
          if (err) return next(err);
          req.flash("success", "You are logged out!");
          res.redirect(req.session.redirectUrl || "/listings");
        });
      }

}
