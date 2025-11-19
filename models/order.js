import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderID : { type : String, required : true, unique : true},
    email : { type : String, required : true },
    name : { type : String, required : true },
    address : { type : String, required : true },
    status : { type : String, required : true, default : "Pending" },
    phoneNumber : { type : String, required : true },
    billItems : {
        type : [
            {
                productId : String,
                productName : String,
                price : Number,
                image : String,
                quantity : Number,
                total : Number
            }
        ],
        required : true
    },
    total : { type : Number, required : true }
});

const Order = mongoose.model("orders", orderSchema);

export default Order