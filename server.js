const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(cookieParser("secreatcode")); 
// SIGNED COOKIES

app.get("/signedcookie", (req,res) => {
    res.cookie("MadeIn", "India", {signed: true});
    res.send("signed cookie sent");
});
// Verifying Signed cookies
app.get("/verifycookie", (req,res) => {
    console.log(req.signedCookies);
    res.send("cookie verified");
})
app.get("/getcookies", (req,res) => {
    res.cookie("name", "zius");
    res.send("send you cookies");
});

app.get("/greet", (req,res) => {
    let {name = "anonoymus"} = req.cookies;
    res.send(`Hi, ${name}`);
})

app.get("/", (req,res) => {
    console.dir(req.cookies);
    res.send("Hi, I am root!");
}) 

app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
})