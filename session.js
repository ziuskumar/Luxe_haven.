const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.set("view engine", "ejs"); 
app.set("views", "./views"); 
const path = require("path");


const flash = require("connect-flash");
app.use(flash());

const sessionOptions = (
  {
    secret: "MysuperSecreat",
    resave: false,
    saveUninitialized: true,
  }
);

app.use(session(sessionOptions));

app.get("/register", (req,res) => {
    let {name = "anonoymus"} = req.query;
    req.session.name = name; // setting session
    // req.flash("success", `you are registered ${name}`);
    if(name == "anonoymus"){
        req.flash("error", `you are not registered ${name}`);
    }
    else{
        req.flash("success", `you are registered ${name}`);
    }
    res.redirect("/greet");
});

app.get("/greet", (req,res) => {
    // let name = req.flash("success");
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.render("page", {name:req.session.name});
})
// app.get("/test", (req, res) => {
//   req.session.name = "zius";
//   res.send("session set");
// });

// app.get("/reqcount", (req,res) => {
//     if(req.session.count) {
//         req.session.count++;
//     }else{
//         req.session.count = 1; 
//     }
//     // req.session.count = req.session.count ? req.session.count + 1 : 1;
//     res.send(`you sent a req ${req.session.count} times`);
// })

app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});
