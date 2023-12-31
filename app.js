const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://dbAdmin:Ur123654@sandbox.x2sxbql.mongodb.net/toDoList");

const itemsSchema = { name : String }
const Item = mongoose.model("Item", itemsSchema)

const item1 = new Item({name:"Welcome to your todolist!"});
const item2 = new Item({name:"The the + button to add a new item."});
const item3 = new Item({name:"<-- Hit this to delete an item."});

const defaultItems = [item1, item2, item3];
//console.log(defaultItems);

Item.insertMany(defaultItems)
  .then(() => {
    console.log('Success');
  })
  .catch(() => {
    console.log("Error");
  });

app.get("/", function(req, res) {

  res.render("list", {listTitle: "Today", newListItems: defaultItems});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
