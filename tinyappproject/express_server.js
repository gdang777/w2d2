const express = require('express') ;
const app = express();
app.set('view engine','ejs');
const port = 8080;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

function generateRandomString() {
 let string = "";
 var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 6; i++){
    string += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return string;
}


var urlDatabase = {
    "b2xVn2": "http://www.lighthouselabs.ca",
    "9sm5xk": "http://www.google.com",
    "asdfas": "http://zombo.com",
};

app.get("/",(req, res)=>{
    res.send("Hello there!");
});
app.get("/urls.json",(req, res)=>{
    res.json(urlDatabase);
});
app.get('/urls', (req,res)=>{
    let templatevars = {urls: urlDatabase};
    res.render('urls_index',templatevars);
});
app.get("/urls/new", (req, res) => {
    res.render("urls_new");
});
app.get("/urls/:id", (req, res) => {
    const shortURL = req.params.id;
    const longURL = urlDatabase[shortURL];
    let templateVars = { shortURL: shortURL, longURL: longURL};
    res.render("urls_show", templateVars);  
});
app.get("/u/:shortURL",(req,res)=>{
    const shortURL = req.params.shortURL;
    // console.log(shortURL,"test1");
    const longUrl = urlDatabase[shortURL];
    // console.log(longUrl, 'Test2');
    res.redirect(longUrl);
})
//handling the delete request from the delete button
app.post('/urls/:id/delete', (req,res)=>{
    delete urlDatabase[req.params.id];
    res.redirect('/urls');
});
//handling the delete request from the delete button
app.post('/urls/:id/update', (req,res)=>{
    urlDatabase[req.params.id] = req.body.longUrl
    res.redirect('/urls');
});
app.get('/Hello',(req,res)=>{
    res.send("<html><body>Hello <b>World</b></body<html>\n");
});


app.listen(port, () =>{
    console.log(`Example app listening on port ${port}!`);
});