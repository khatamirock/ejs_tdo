const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

//to do list items array
const items = ["Bring", "Me", "FOOD"];
var chekdItms=[];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));


// Middleware to parse JSON bodies
app.use(express.json()); // this line is suffice
app.use(express.urlencoded({ extended: true }));
// end >>>>>>>>>>>>>>>>>>>>>>>>



app.get("/", function (req, res) {

	const day = date.getDate();
    console.log("AGAIN!!!");
    res.render("list", {kindOfDay: day, newListItems: items,checkedItems:chekdItms});
});

app.post("/", function(req, res) {
	
	const item = req.body.newItem;
    const ind=req.body;
    console.log(ind);

//does not push item if input is empty	
	if(item !== "") {
	   items.push(item);
	}	
 
	res.redirect("/");
})


app.get('/t', function(req, res) {
    const messages = [
        "Hello, world!",
        "This is a test message.",
        "Random message number 3.",
        "Testing, testing, 123."
    ];

    // Generate a random index to select a message from the array
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];

    // Send the random message as JSON response
    res.json({ message: randomMessage });
});


app.post('/box', function(req, res) {
    var index = req.body.index; // Access index from req.body
    console.log("on server reply >>>",index);
    const indexToRemove = chekdItms.indexOf(index);

    if(indexToRemove !== -1){
       
        chekdItms.splice(indexToRemove, 1);
    }
    else{
        chekdItms.push(index);
    }
    console.log(chekdItms);
    res.redirect("/");
    // Sending back a response with some data
    
});





app.listen(3000, function () {
	console.log("Server started on port 3000"); 
});
