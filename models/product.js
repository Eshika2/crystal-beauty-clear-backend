import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    altNames : {
        type : [String],
        default : []
    },
    price : {
        type : Number,
        required : true
    },
    labeledPrice : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    images : {
        type : [String],
        required : true,
        default : ["https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"]
    },
    stock : {
        type : Number,
        required : true
    },
    
})

const Product = mongoose.model("products", productSchema);

export default Product
