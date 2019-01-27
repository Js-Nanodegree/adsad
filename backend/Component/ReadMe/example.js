const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
mongoose.connect("mongodb://localhost:27017/usersdb", { useNewUrlParser: true });
 
const userScheme = new Schema({
    name: {
        type: String,
        required: true,
        minlength:3,
        maxlength:20
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max:100
    }
}, {versionKey: false});


const User = mongoose.model("User", userScheme);


User.create({name: "Tom", age: 34}, function(err, doc){
    mongoose.disconnect();
      
    if(err) return console.log('err',err);
      
    console.log("Сохранен объект user", doc);
});

 
User.find({name: "Tom"}, function(err, docs){
    mongoose.disconnect();
     
    if(err) return console.log(err);
     
    console.log('find',docs);
});

User.find({name: "Tom"}, function(err, docs){
    mongoose.disconnect();
     
    if(err) return console.log(err);
     
    console.log(docs);
});

User.findOne({name: "Tom"}, function(err, doc){
    mongoose.disconnect();
     
    if(err) return console.log(err);
     
    console.log(doc);
});

const id = "588a0f8c9151d23ce47bf98d";
User.findById(id, function(err, doc){
    mongoose.disconnect();
     
    if(err) return console.log(err);
     
    console.log(doc);
});

User.remove({age:33}, function(err, result){
    mongoose.disconnect();
     
    if(err) return console.log(err);
     
    console.log(result);
});