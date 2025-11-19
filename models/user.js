import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : "user"
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true,
        default : "Not Given"
    },
    is_disabled : {
        type : Boolean,
        required : true,
        default : false
    },
    is_email_verified : {
        type : Boolean,
        required : true,
        default : false
    }
})

const User = mongoose.model("users", userSchema);

export default User