const express = require("express");
const bodyParser = require("body-parser");
const mongoose   = require("mongoose");

const app = express();

//Configuring the port 
const port = 3000;

//Connection to MongoDB
mongoose.connect("mongodb://admin:admin@ds023523.mlab.com:23523/priyamongodb", { useMongoClient: true })
.then(() => console.log('connection succesful'))
.catch((err) => console.error(err));

var Item = require("./models/item");

//TO access request body parameters
app.use(bodyParser.json());

//Inserting items into DB
app.post('/item', function(req, res){
    var item = new Item(req.body);
	
    item.save(function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send('success');
      }
    });
});

//TO display data in the DB
app.get('/item', function(req, res){
    Item.find({},function(err, items){
        if(err) res.send(err);
        res.json(items);
    });
});

//To Delete Data in DB
app.delete('/item/:id', function(req, res){ 
	console.log(req.params.id);
    Item.remove({'_id' : req.params.id}, function(err){
        if(err) res.send(err);
        res.json("Deleted successfully!");
    });
});

//To patch Data in DB
app.patch('/item/:id', function (req, res) {
    var updateObject = req.body; 
    
	Item.findById(req.params.id, function(err, datToBeUpdated) {
	  if (!datToBeUpdated)
		return next(new Error('Could not load Document'));
	  else {
		  Item.update({"_id":req.params.id}, updateObject,function(err) {
		  if (err)
			console.log('error')
		  else
			console.log('success')
		});
	  }
	  
	}); 
});


app.listen(port, function(){
    console.log("Server running on port ", port);
});