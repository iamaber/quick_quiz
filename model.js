const mongoose = require('mongoose');
const empSchema = new mongoose.Schema({
    name :{
        type :  String,
        required : true,
    },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    phone : {
        type : Number,
        required : true,

    },
    password : {
        type : String,
        required : true,
    },
    cpassword : {
        type : String,
        required : true,
    }        
});

const empCollection = new mongoose.model('emcollection,empSchema');

module.exports = empCollection;
