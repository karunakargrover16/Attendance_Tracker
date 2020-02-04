var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required : true
    },
    course :{
        type:Array, required:true
    }
});

module.exports = mongoose.model('User',userSchema);